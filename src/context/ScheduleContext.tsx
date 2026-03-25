"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ScheduleEvent {
  id: string;
  mentorId: string;
  menteeId: string;
  date: Date;
  startTime: string; // e.g., "14:00"
  endTime: string;   // e.g., "14:30"
  topic: string;
  meetingLink: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

interface ScheduleContextType {
  events: ScheduleEvent[];
  notifications: AppNotification[];
  addEvent: (event: Omit<ScheduleEvent, "id">) => Promise<{ success: boolean; error?: string }>;
  getEventsForMentee: (menteeId: string) => ScheduleEvent[];
  getEventsForMentor: (mentorId: string) => ScheduleEvent[];
  markNotificationsRead: (userId: string) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Initial Mock Meetings
const MOCK_START_EVENTS: ScheduleEvent[] = [
  {
    id: "evt_1",
    mentorId: "mentor_1",
    menteeId: "mentee_1",
    date: new Date(),
    startTime: "10:00",
    endTime: "10:30",
    topic: "Introduction and Goal Setting",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  }
];

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<ScheduleEvent[]>(MOCK_START_EVENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const markNotificationsRead = (userId: string) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  };

  const addEvent = async (newEventData: Omit<ScheduleEvent, "id">) => {
    // 1. Conflict Engine: Check if mentor or mentee is already booked at this exact time
    const targetDateStr = newEventData.date.toDateString();
    
    const hasConflict = events.some(evt => {
      const isSameDay = evt.date.toDateString() === targetDateStr;
      const isTimeOverlap = (newEventData.startTime >= evt.startTime && newEventData.startTime < evt.endTime) ||
                            (newEventData.endTime > evt.startTime && newEventData.endTime <= evt.endTime) ||
                            (newEventData.startTime <= evt.startTime && newEventData.endTime >= evt.endTime);
                            
      const isSameUser = evt.mentorId === newEventData.mentorId || evt.menteeId === newEventData.menteeId;
      
      return isSameDay && isTimeOverlap && isSameUser;
    });

    if (hasConflict) {
      return { success: false, error: "Time slot conflict detected for either the Mentor or Mentee." };
    }

    // 2. Create Event
    const newEvent: ScheduleEvent = {
       ...newEventData,
       id: `evt_${Date.now()}`
    };

    setEvents(prev => [...prev, newEvent]);

    // 2.5 Dispatch UI Notification to BOTH users
    const menteeNotif: AppNotification = {
      id: `notif_mentee_${Date.now()}`,
      userId: newEventData.menteeId,
      message: `📆 Action Required: You have a new mentorship session scheduled for ${newEventData.topic} at ${newEventData.startTime}.`,
      date: new Date(),
      read: false,
      link: '/dashboard/mentee'
    };
    
    const mentorNotif: AppNotification = {
      id: `notif_mentor_${Date.now()}`,
      userId: newEventData.mentorId,
      message: `✅ Success: Your session on "${newEventData.topic}" at ${newEventData.startTime} has been scheduled.`,
      date: new Date(),
      read: false,
      link: '/dashboard/mentor'
    };
    
    setNotifications(prev => [menteeNotif, mentorNotif, ...prev]);

    // 3. Trigger Outbound HTTP request to actually send the email via Nodemailer
    try {
      await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
    } catch (e) {
      console.warn("Emails not configured or failed to send", e);
    }

    return { success: true };
  };

  const getEventsForMentee = (menteeId: string) => events.filter(e => e.menteeId === menteeId);
  const getEventsForMentor = (mentorId: string) => events.filter(e => e.mentorId === mentorId);

  return (
    <ScheduleContext.Provider value={{ events, notifications, addEvent, getEventsForMentee, getEventsForMentor, markNotificationsRead }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
