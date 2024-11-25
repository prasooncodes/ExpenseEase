import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {
        totalExpenses,
        incomes, 
        expenses, 
        totalIncome, 
        totalBalance, 
        getIncomes, 
        getExpenses,
        token // Add token from global context
    } = useGlobalContext()

    useEffect(() => {
        // Only fetch data when token is available
        if (token) {
            getIncomes()
            getExpenses()
        }
    }, [token, getIncomes, getExpenses]) // Add dependencies

    // Show loading state if no token
    if (!token) {
        return (
            <DashboardStyled>
                <InnerLayout>
                    <h1>Loading...</h1>
                </InnerLayout>
            </DashboardStyled>
        )
    }

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>ExpenseEase Financial Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>₹{totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>₹{totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>₹{totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>₹{Math.min(...incomes.map(item => item.amount))}</p>
                            <p>₹{Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>₹{Math.min(...expenses.map(item => item.amount))}</p>
                            <p>₹{Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            background: #FCF6F9;
            border-radius: 32px;
            padding: 1rem;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                
                .income, .expense{
                    grid-column: span 2;
                }
                
                .income, .expense, .balance{
                    background: white;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: all 0.3s ease-in-out;
                    
                    &:hover {
                        transform: translateY(-3px);
                        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
                    }
                    
                    h2 {
                        font-size: 1.5rem;
                        margin-bottom: 0.5rem;
                        color: var(--primary-color);
                    }
                    
                    p{
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: var(--primary-color);
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                    p{
                        color: var(--color-green);
                        opacity: 1;
                        font-size: 3.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            background: #FCF6F9;
            border-radius: 32px;
            padding: 1rem;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.5rem;
            }
            
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                    color: var(--color-accent);
                }
            }
            
            .salary-item{
                background: white;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 1rem 0;
                transition: all 0.3s ease-in-out;
                
                &:hover {
                    transform: translateY(-3px);
                    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
                }
                
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                    color: var(--primary-color);
                }
            }
        }
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: var(--primary-color);
        text-align: center;
        position: relative;
        
        &:after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 70px;
            height: 3px;
            background: var(--color-accent);
            border-radius: 10px;
        }
    }

    @media (max-width: 1200px) {
        .stats-con {
            grid-template-columns: 1fr;
            .chart-con, .history-con {
                grid-column: 1 / -1;
            }
        }
    }
`;

export default Dashboard;