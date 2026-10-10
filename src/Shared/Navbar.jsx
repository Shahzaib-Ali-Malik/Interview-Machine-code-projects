import { Bell, Plus, Search, Sparkles } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen } from './state/SharedSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const {isOpen} = useSelector(store => store.shared)
    const dispatch = useDispatch()
    console.log(isOpen);
    
    function notify(){
      toast.success("Still In Production")
    }
  return (
    <div>
         {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="hidden sm:inline text-xs uppercase tracking-wider text-slate-400 font-semibold">Interview Practice Tracker</span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Master the Technical Loop</h1>
            </div>
          </div>

          {/* Navigation Tabs (Static) */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-white text-indigo-600 shadow-xs">Dashboard</button>
            <button onClick={()=>notify()} className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900">Question Bank</button>
            <button onClick={()=>notify()} className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900">Analytics</button>
            <button onClick={()=>notify()} className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900">Sprint Mode</button>
          </nav>

          {/* Right Action Icons & Add Button */}
          <div className="flex items-center space-x-3">
            

            <button onClick={()=>notify()} className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            <button onClick={()=>dispatch(setIsOpen(!isOpen))} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md shadow-indigo-100">
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>

            <img 
              onClick={()=>notify()} 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 hidden sm:block" 
            />
          </div>
        </div>
      </header>

    </div>
  )
}

export default Navbar