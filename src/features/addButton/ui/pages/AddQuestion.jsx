import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { setIsOpen } from '../../../../Shared/state/SharedSlice';
import { setEditQuestion, setQuestions } from '../../state/AddQuestionSlice';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

function AddQuestion() {
    const {isOpen} = useSelector(store => store.shared)
    const {questions,editQuestion} = useSelector(store => store.addQuestion)
    const dispatch = useDispatch()
    const {handleSubmit,register,reset,formState:{errors}} = useForm();

    
    const submitHandler = (data)=>{

      if(editQuestion){
        const updatingQuestion = {...editQuestion,...data}

        const allUpdatedQuestions = questions.map((val)=>{
          return val.id === updatingQuestion.id ? updatingQuestion : val
        })

        dispatch(setQuestions(allUpdatedQuestions))
        localStorage.setItem("allQuestions",JSON.stringify(allUpdatedQuestions)); 
        dispatch(setIsOpen(false))  
        dispatch(setEditQuestion(null)) 
        reset() 
        toast.success("Question updated successfully")
        return
      }
        const allData = [...questions,{...data,id:nanoid()}];
        dispatch(setQuestions(allData))
        localStorage.setItem("allQuestions",JSON.stringify(allData)); 
        dispatch(setIsOpen(false))  
        toast.success("Question added successfully")
        reset()    
    }

    useEffect((val)=>{
      if(editQuestion){
        reset(editQuestion)
      }
    },[editQuestion])

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex items-start justify-center font-sans">

      {/* 2. Modal Overlay (Appears when isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">{editQuestion ? "Update Question": "Add New Practice Question"}</h3>
              <button
                onClick={() => {
                  dispatch(setIsOpen(false))
                  dispatch(setEditQuestion(null))
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 space-y-4">
              {/* Question Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Question Title & Topic
                </label>
                <input
                    {...register("question",{required: "Question Title is required"})}
                  type="text"
                  placeholder="e.g., LRU Cache Implementation"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 placeholder:text-slate-400 transition-all"
                />
                {errors.question && <p className='text-red-500'>{errors.question.message}</p>}
              </div>

              {/* Grid Fields: Category & Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select 
                    {...register("category",{required: "Category is required"})}
                   className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 transition-all">
                    <option>DSA</option>
                    <option>Technical</option>
                    <option>Machine Coding</option>
                    <option>Git</option>
                  </select>
                {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Difficulty
                  </label>
                  <select 
                    {...register("difficulty",{required: "Difficulty is required"})}
                   className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 transition-all">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                {errors.difficulty && <p className='text-red-500'>{errors.difficulty.message}</p>}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Initial Status
                </label>
                <select {...register("status",{required: "Status is required"})} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 transition-all">
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
              </div>

              {/* Notes / Complexity info */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Complexity & Notes (Optional)
                </label>
                <input
                  type="text"
                  {...register("complexity")}
                  placeholder="e.g., O(1) ops, Hash Map"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 placeholder:text-slate-400 transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  dispatch(setIsOpen(false));
                  dispatch(setEditQuestion(null))
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type='submit'
                onClick={handleSubmit(submitHandler)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-all"
              >
                {editQuestion ? "Update" : "Save Question"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AddQuestion