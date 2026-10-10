import { Edit2, Square, Trash2 } from 'lucide-react'
import React from 'react'

const QuestionTabel = ({eachQuestion,deleteQuestion,updateQuestionStatus,updatingQuestion}) => {
  return (
    <tr className="hover:bg-slate-50/80">
                  <td className="py-4 px-4 text-center"><Square className="w-4 h-4 text-slate-400 mx-auto" /></td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-900">{eachQuestion.question}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{eachQuestion.complexity}</div>
                  </td>
                  <td className="py-4 px-4"><span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">{eachQuestion.category}</span></td>
                  <td className="py-4 px-4"><span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700">{eachQuestion.difficulty }</span></td>
                  <td>
                    <select onChange={(e)=>{updateQuestionStatus(eachQuestion.id,e.target.value)}} value={eachQuestion.status} className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${eachQuestion.status === "completed" ? "bg-amber-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"} border border-emerald-200`}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500 font-medium">Today</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={()=>updatingQuestion(eachQuestion)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={()=>deleteQuestion(eachQuestion.id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
    </tr>
  )
}

export default QuestionTabel