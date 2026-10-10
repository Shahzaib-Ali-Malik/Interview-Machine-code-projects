import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  BarChart3, 
  Zap, 
  Search, 
  Plus, 
  Bell, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  LayoutList, 
  LayoutGrid, 
  CheckSquare, 
  Square, 
  FileCode, 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AddQuestion from '../../../addButton/ui/pages/AddQuestion';
import QuestionTabel from '../../../addButton/ui/components/QuestionTabel';
import { setQuestions,setEditQuestion } from '../../../addButton/state/AddQuestionSlice';
import { setIsOpen } from '../../../../Shared/state/SharedSlice';
import { toast } from 'react-toastify';

 function HomePage() {
   const {isOpen} = useSelector(store => store.shared)
   const {questions} = useSelector(store => store.addQuestion)
   const dispatch = useDispatch()
   let [dsa,setDsa] = useState("")
   let [git,setGit] = useState("")
   let [totalPercent,setTotalPercent] = useState("")

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

   const dsaCompletedProblems = ()=>{
       let total = questions.reduce((acc,val)=>{
        if(val.category === "DSA"){
          return acc + 1
        } 
        return acc
      },0)

      let completed = questions.reduce((acc,val)=>{
        if(val.category === "DSA" && val.status === "Completed"){
          return acc + 1
        } 
        return acc
      },0)

      let pending = questions.reduce((acc,val)=>{
        if(val.category === "DSA" && val.status === "Pending"){
          return acc + 1
        } 
        return acc
      },0)
      setDsa({total,completed,pending})

      return {
        total,completed,pending
      }
      
   }

   const gitCompletedProblems = ()=>{
       let total = questions.reduce((acc,val)=>{
        if(val.category === "Git"){
          return acc + 1
        } 
        return acc

      },0)

      let completed = questions.reduce((acc,val)=>{
        if(val.category === "Git" && val.status === "Completed"){
          return acc + 1
        } 
        return acc
      },0)
      setGit({total,completed})

      return {
        total,completed
      }
      
   }

   const deleteQuestion = (id)=>{
    let noneDeleted = questions.filter((val)=>{
      return val.id !== id
    }) 
    dispatch(setQuestions(noneDeleted));
    localStorage.setItem("allQuestions",JSON.stringify(noneDeleted))
    toast.success("Question deleted successfully")
    
   }

   const updateQuestionStatus = (id,changedValue)=>{
      const updateing = questions.map((val)=>{
        return val.id === id ? {...val, status: changedValue} : val
      })

    dispatch(setQuestions(updateing));
    localStorage.setItem("allQuestions",JSON.stringify(updateing))
      
   }

   const totalQuestionsPercent = ()=>{
    const percent = questions.reduce((acc,val)=>{
      if(val.status === 'Completed'){
        return acc + 1
      }
      return acc
    },0)

    const machineCodeCompleted = questions.reduce((acc,val)=>{
      if(val.category === "Machine Coding" &&   val.status === 'Completed' ){
        return acc + 1
      }
      return acc
    },0)
    const TechniqualCompleted = questions.reduce((acc,val)=>{
      if(val.category === "Technical" &&   val.status === 'Completed' ){
        return acc + 1
      }
      return acc
    },0)

    let machineCodeTotal = questions.reduce((acc,val)=>{
        if(val.category === "Machine Coding"){
          return acc + 1
        } 
        return acc
      },0)
    let TechniqualTotal = questions.reduce((acc,val)=>{
        if(val.category === "Technical"){
          return acc + 1
        } 
        return acc
      },0)
      

    setTotalPercent({
      percent,
      machineCodeCompleted,
      TechniqualCompleted,
      machineCodeTotal,
      TechniqualTotal
   })

   
    return {
      percent,
      machineCodeCompleted,
      TechniqualCompleted,
      machineCodeTotal,
      TechniqualTotal

   } 
  }

  const filteredQuestions =   
     questions.filter((val)=>{
      const searched =val.question.toLowerCase().includes(search.toLowerCase());
      const checkStatus = status === "all" || val.status === status;
      const checkCategory = category === "all" || val.category === category;
      const checkDifficulty = difficulty === "all" || val.difficulty === difficulty;
      return (searched && checkStatus && checkCategory && checkDifficulty)
    })

  const reset = ()=>{
    setStatus("all")
    setDifficulty("all")
    setCategory("all")
    setSearch("")
  }

  const updatingQuestion = (question) => {
  dispatch(setEditQuestion(question));
  dispatch(setIsOpen(true));
};
    

   useEffect(()=>{
      dsaCompletedProblems();
      gitCompletedProblems();
      totalQuestionsPercent();
   },[questions])

   const dsaPercent = dsa.total ? Math.floor((dsa.completed / dsa.total) * 100): 0
   const gitPercent = git.total ? ((git.completed/git.total)*100).toFixed(0) : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased pb-16 selection:bg-indigo-500 selection:text-white">
      
     
      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 4 Metrics Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Questions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Questions</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{questions.length} <span className="text-xs font-normal text-slate-400">Tracked</span></h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full mr-1.5 font-bold">+{Math.floor(questions.length/2)} added this week</span>
            </div>
          </div>

          {/* Card 2: Completed DSA Problems */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Completed DSA Problems</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{dsa.completed || 0} <span className="text-sm font-normal text-slate-400">/ {dsa.total || 0} Solved</span></h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="bg-emerald-100/70 text-emerald-800 font-semibold px-2 py-0.5 rounded-md">{dsaPercent }% Complete</span>
              <span className="text-slate-500">{dsa.pending} pending</span>
            </div>
          </div>

          {/* Card 3: Technical & Concepts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Technical & Concepts</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{git.completed} <span className="text-sm font-normal text-slate-400">/ {git.total} Mastered</span></h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="bg-violet-100/70 text-violet-800 font-semibold px-2 py-0.5 rounded-md">{gitPercent}% Rate</span>
              <span className="text-slate-500">System & Git</span>
            </div>
          </div>

          {/* Card 4: Readiness Vector */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Readiness Vector</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h3 className="text-xl font-extrabold text-slate-900">Round-Ready</h3>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 truncate">Target benchmark achieved for L5 lo...</p>
          </div>

        </section>

        {/* Overall Interview Readiness Progress Section */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Overall Interview Readiness</h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">High Velocity</span>
              </div>
              <p className="text-xs text-slate-500">Weighted mastery across core technical tracks</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600">{questions.length > 0 ?((totalPercent.percent/questions.length)*100).toFixed(2) : 0 }%</span>
              <span className="text-xs text-slate-400 ml-1">Total Complete</span>
            </div>
          </div>

          {/* Main gradient progress bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
            <div className={`bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 h-full rounded-full`} style={{ width: `${((totalPercent.percent/questions.length)*100) || 0}%` }} ></div>
          </div>

          {/* Sub-track progress breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">DSA Loops</span>
                <span className="text-indigo-600">{ dsaPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-indigo-600 h-full rounded-full`} style={{ width: `${dsaPercent}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Techniqual</span>
                <span className="text-violet-600">{totalPercent.TechniqualTotal ? ((totalPercent.TechniqualCompleted/totalPercent.TechniqualTotal)*100).toFixed(2) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-violet-600 h-full rounded-full`} style={{ width: `${totalPercent.TechniqualTotal ? (totalPercent.TechniqualCompleted/totalPercent.TechniqualTotal)*100 :  0}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Machine Coding</span>
                <span className="text-blue-600">{totalPercent.machineCodeTotal ? ((totalPercent.machineCodeCompleted/totalPercent.machineCodeTotal)*100).toFixed(2) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-blue-600 h-full rounded-full`} style={{width: `${totalPercent.machineCodeTotal ? ((totalPercent.machineCodeCompleted/totalPercent.machineCodeTotal)*100) : 0}%`}}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Git & Core Tools</span>
                <span className="text-emerald-600">{git.total ? ((git.completed/git.total)*100).toFixed(2) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-emerald-600 h-full rounded-full`} style={{width: `${git.total ? ((git.completed/git.total)*100) : 0}%`}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Search, Filter Toolbar & View Controls */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              onChange={(e)=>setSearch(e.target.value)}
              type="text"
              placeholder="Search questions by Title"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium">
                  <option value="all">All Categories ▾</option>
                  <option value="DSA">DSA</option>
                  <option value="Technical">Technical</option>
                  <option value="Machine Coding">Machine Coding</option>
                  <option value="Git">Git</option>
            </select>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium">
              <option value="all">All Statuses ▾</option>
              <option value= "Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              
            </select>
            <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium">
              <option value="all">All Difficulties ▾</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            
            <button onClick={()=>reset()} className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

          </div>

          <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Showing {questions.length} of {questions.length} questions</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button className="p-1.5 rounded-lg bg-white text-indigo-600 shadow-xs"><LayoutList className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-lg text-slate-500"><LayoutGrid className="w-4 h-4" /></button>
            </div>
          </div>
        </section>

        {/* Question Tracker Table */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center"><Square className="w-4 h-4 text-slate-400 mx-auto" /></th>
                  <th className="py-3.5 px-4">Question Title & Topic</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Difficulty</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Last Practiced</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                
                {/* Row 1 */}
                {
                    filteredQuestions.map((val)=>{
                        return <QuestionTabel key={val.id} updatingQuestion={updatingQuestion} updateQuestionStatus={updateQuestionStatus} deleteQuestion={deleteQuestion} eachQuestion={val}/>
                    })
                }
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Metrics Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Next</span>
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-2">Consistent Hashing with Virtual Nodes</h3>
              <p className="text-xs text-slate-500 mt-1">High frequency for upcoming Senior SWE loop at Meta & Stripe.</p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600">
              <span>Start Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Velocity</span>
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <h3 className="text-3xl font-black text-slate-900">14.2</h3>
                <span className="text-xs text-slate-500 font-medium">problems / wk</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Exceeding target benchmark of 10 problems per cycle.</p>
            </div>
            <div className="flex items-center text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              <span>Optimal retention curve</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mock Loop Countdown</span>
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-2">Full Virtual Onsite Simulation</h3>
              <p className="text-xs text-slate-500 mt-1">Scheduled for Saturday, 10:00 AM • 4 distinct 45-min rounds.</p>
            </div>
            <div className="text-xs font-bold text-blue-600">
              Configure Session ⚙
            </div>
          </div>

        </section>

      </main>

      {
        isOpen ? <AddQuestion/> : ""
      }

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700">Interview Practice Tracker</span>
          <span>— Master the technical loop.</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>v2.4.0</span>
          <span>Keyboard Shortcuts</span>
          <span>API Documentation</span>
        </div>
      </footer>

    </div>
  );
}

export default HomePage