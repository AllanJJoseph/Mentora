"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { useSchedule, ScheduleEvent } from "@/context/ScheduleContext";
import { MOCK_MENTEES } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { Calendar as CalIcon, Clock, Users, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import 'react-calendar/dist/Calendar.css'; // Requires global stylesheet overrides later if desired.

interface CalendarSchedulerProps {
  viewRole: "mentor" | "mentee";
}

export default function CalendarScheduler({ viewRole }: CalendarSchedulerProps) {
  const { user } = useAuth();
  const { events, addEvent, getEventsForMentee, getEventsForMentor } = useSchedule();
  
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("14:30");
  const [selectedMentee, setSelectedMentee] = useState(MOCK_MENTEES[0]?.uid || "");
  const [topic, setTopic] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get relevant events
  const myEvents = viewRole === "mentor" 
    ? getEventsForMentor(user?.uid || "mentor_1")
    : getEventsForMentee(user?.uid || "mentee_1");

  // Highlight days with events on the calendar
  const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      if (myEvents.find(e => e.date.toDateString() === date.toDateString())) {
        return 'highlighted-day'; // Added CSS class
      }
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !selectedMentee) return;
    
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await addEvent({
        mentorId: user?.uid || "mentor_1",
        menteeId: selectedMentee,
        date: date,
        startTime,
        endTime,
        topic,
        meetingLink: meetingLink || "https://meet.google.com/xyz-abcd-efg"
      });

      if (!result.success && result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTopic("");
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left: Interactive Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 custom-calendar-wrapper">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CalIcon className="w-5 h-5 text-indigo-500" />
          Master Calendar
        </h3>
        
        <div className="mb-6 flex justify-center">
          <Calendar 
            onChange={(val) => setDate(val as Date)} 
            value={date} 
            tileClassName={tileClassName}
            className="border-none w-full !bg-transparent dark:text-white"
          />
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
          <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
            Events on {date.toDateString()}
          </h4>
          
          <div className="space-y-3">
            {myEvents.filter(e => e.date.toDateString() === date.toDateString()).length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">No sessions scheduled for this day.</p>
            ) : (
              myEvents.filter(e => e.date.toDateString() === date.toDateString()).map(evt => (
                <div key={evt.id} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 flex gap-4">
                  <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 min-w[60px]">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{date.getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 dark:text-white text-sm">{evt.topic}</h5>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {evt.startTime} - {evt.endTime}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3"/> 1:1 Session</span>
                    </div>
                    <a href={evt.meetingLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">
                      <LinkIcon className="w-3 h-3" /> Join Video Call
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right: Scheduling Form (Only visible to Mentors) */}
      {viewRole === "mentor" ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">🗓️</span>
            Schedule New Session
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Select a date on the calendar, fill out the class details, and Mentora will automatically sync the calendars and email the invitations.
          </p>

          <form onSubmit={handleSchedule} className="flex-1 flex flex-col space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Select Mentee</label>
              <select 
                value={selectedMentee} 
                onChange={e => setSelectedMentee(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
              >
                {MOCK_MENTEES.map(m => <option key={m.uid} value={m.uid}>{m.displayName} ({m.skills.join(', ')})</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Start Time</label>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">End Time</label>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Session Topic / Goal</label>
              <input 
                type="text" 
                placeholder="e.g. Introduction to React state"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none mb-4"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 flex items-center gap-1">
                Google Meet Link
              </label>
              <div className="relative">
                <input 
                  type="url" 
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={e => setMeetingLink(e.target.value)}
                  className="w-full bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                />
                <LinkIcon className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm flex gap-2 items-start animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl text-sm flex gap-2 items-start animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p>Session Scheduled Successfully! Emails dispatched.</p>
              </div>
            )}

            <div className="pt-4 mt-auto">
              <button 
                type="submit"
                disabled={loading || !topic}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
              >
                {loading ? "Scheduling & Sending Emails..." : "Confirm & Schedule Class"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden lg:flex bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-sm p-12 flex-col justify-center items-center text-center text-white">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4">Stay Consistent</h2>
          <p className="text-indigo-100 max-w-sm mx-auto leading-relaxed">
            Your mentor manages the schedule. Check your calendar daily to see upcoming sessions, and remember to join the video call on time!
          </p>
        </div>
      )}
    </div>
  );
}
