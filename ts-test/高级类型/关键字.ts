/* 
    https://shanyue.tech/post/ts-tips.html#_08-record-dictionary-many
    keyof
    typeof
   
*/

//  is 类型判断
function isAxiosError (error: any): error is AxiosError {
    return error.isAxiosError
}
