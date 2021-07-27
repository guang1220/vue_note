import {request} from "./request";

export const getNote = (title) => request({ url:`/note/selectByTitle?title=${title}`})
export const getNoteById = (id) => request({ url:`/note/selectById?id=${id}`})
export const addNote = (data) => request({ url:'/note/insert',method:'post',data:data})
export const deleteNote = (id) => request({ url:`/note/delete?id=${id}`,method:'delete'})
export const updateNote = (data) => request({ url:'/note/update',method:'put',data:data})



export const getFolder = () => request({ url:`/folder/selectAll`})
export const getFolderWithNote = () => request({ url:`/folder/selectAllWithNote`})
export const updateFolder = (data) => request({ url:'/folder/update',method:'put',data:data})
export const addFolder = (data) => request({ url:'/folder/insert',method:'post',data:data})
export const deleteFolder = (id) => request({ url:`/folder/delete?id=${id}`,method:'delete'})










