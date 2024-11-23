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
    const [isLoading, setIsLoading] = useState(false)

    // Effect to set up authentication token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUserData()
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    // Income functions
    const addIncome = async (income) => {
        setIsLoading(true)
        try {
            const response = await axios.post('add-income', income)
            await getIncomes()
            setError(null)
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getIncomes = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('get-incomes')
            setIncomes(response.data)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const deleteIncome = async (id) => {
        setIsLoading(true)
        try {
            await axios.delete(`delete-income/${id}`)
            await getIncomes()
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0)
    }

    // Expense functions
    const addExpense = async (expense) => {
        setIsLoading(true)
        try {
            const response = await axios.post('add-expense', expense)
            await getExpenses()
            setError(null)
            return response.data
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getExpenses = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('get-expenses')
            setExpenses(response.data)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const deleteExpense = async (id) => {
        setIsLoading(true)
        try {
            await axios.delete(`delete-expense/${id}`)
            await getExpenses()
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense')
            if (err.response?.status === 401) {
                logout()
            }
        } finally {
            setIsLoading(false)
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
        setIsLoading(true)
        try {
            const response = await axios.post('auth/login', {
                email,
                password
            })
            
            const { token: newToken, user: userData } = response.data
            
            localStorage.setItem('token', newToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
            
            setToken(newToken)
            setUser(userData)
            setError(null)
            
            return { success: true }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed')
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setToken(null)
        setUser(null)
        setIncomes([])
        setExpenses([])
        setError(null)
    }

    const fetchUserData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('auth/user')
            setUser(response.data.user)
            setError(null)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching user data')
            logout()
        } finally {
            setIsLoading(false)
        }
    }

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
            token,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}