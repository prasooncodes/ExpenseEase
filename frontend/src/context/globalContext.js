import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

// Set default axios configurations
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Income functions
    const addIncome = async (income) => {
        try {
            const response = await axios.post('add-income', income)
            getIncomes()
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income')
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get('get-incomes')
            setIncomes(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes')
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`delete-income/${id}`)
            getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income')
        }
    }

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0)
    }

    // Expense functions
    const addExpense = async (expense) => {
        try {
            const response = await axios.post('add-expense', expense)
            getExpenses()
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense')
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get('get-expenses')
            setExpenses(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses')
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`delete-expense/${id}`)
            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense')
        }
    }

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0)
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return history.slice(0, 3)
    }

    // Authentication functions
    const login = async (email, password) => {
        try {
            const response = await axios.post('auth/login', {
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

    const fetchUserData = async () => {
        try {
            const response = await axios.get('auth/user')
            setUser(response.data.user)
        } catch (error) {
            logout()
        }
    }

    // Effect to set up authentication token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUserData()
        }
    }, [token])

    return (
        <GlobalContext.Provider value={{
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
            user,
            login,
            logout,
            token
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}