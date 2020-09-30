import { reactive, provide, inject, readonly } from 'vue';

/**
 * 
 * 函数式编程的优势是什么
 * 
 * 
*/ 




// 为什么要使用 Symbol?

export const stateSymbol = Symbol('state');

export const createState = () => reactive({ counter: 0 });

export const useState = () => inject(stateSymbol);

export const provideState = () => provide(
    stateSymbol,
    createState()
    );
    
    
    
    
    
// vue3 状态管理
export const storeSymbol = Symbol("store"); // 定义 store key
export const store = () => { 
    const state = reactive({ number: 0 }); // 状态
    const increment = () => state.number++; // 修改状态的方法
    return {increment, state: readonly(state)} // 返回方法及数据
}

export const useStore = () => inject(storeSymbol); // 插入组件




