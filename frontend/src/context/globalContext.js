import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    // Existing state for expenses/incomes
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    
    // New authentication state
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Existing income functions
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    // Existing expense functions
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }

    // New authentication functions
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login`, {
                email,
                password
            })
            
            const { token, user } = response.data
            
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            setToken(token)
            setUser(user)
            
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setToken(null)
        setUser(null)
    }

    // Effect to handle token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUserData()
        }
    }, [token])

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}auth/user`)
            setUser(response.data.user)
        } catch (error) {
            logout()
        }
    }

    return (
        <GlobalContext.Provider value={{
            // Existing values
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            // New authentication values
            user,
            login,
            logout,
            token
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}