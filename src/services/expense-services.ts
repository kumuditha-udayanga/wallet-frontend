import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
import {API_URL} from "../constants";
import {Expense} from "../types";

// Fetch all expenses
export const getExpenses = async () => {
    try {
        const result = await axios.get(
            `${API_URL}/expense/`
        ).then((result: AxiosResponse<Expense[]>) => {
            if (result.status === 200 || result.status === 204) {
                return result.data;
            } else {
                throw new Error();
            }
        })
    } catch (e) {
        notification.error({
            message: 'Warning!',
            description: 'Something went wrong when fetching expenses'
        });
    }
}

// Fetch expense by ID
export const getExpenseById = async (id: number) => {
    try {
        const result = await axios.get(
            `${API_URL}/expense/${id}`
        );
        if (result.status === 200) {
            return result.data;
        }
        notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when fetching the expense'
        });
    } catch (e) {
        notification.error({
            message: 'Error!',
            description: 'Something went wrong when fetching the expense'
        });
    }
}

// Create new expense
export const createExpense = async (expense: Expense) => {
    try {
        const result = await axios.post(
            `${API_URL}/expense/`, expense
        );
        if (result.status === 201) {
            return result.data;
        }
        notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when creating the expense'
        });
    } catch (e) {
        notification.error({
            message: 'Error!',
            description: 'Something went wrong when creating the expense'
        });
    }
}

// Delete expense by ID
export const deleteExpenseById = async (id: number) => {
    try {
        const result = await axios.delete(
            `${API_URL}/expense/${id}`
        );
        if (result.status === 200) {
            return result.data;
        }
        notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when deleting'
        });
    } catch (e) {
        notification.error({
            message: 'Error!',
            description: 'Something went wrong when deleting'
        });
    }
}

// Update expense by ID
export const updateExpenseById = async (id: number, expense: Expense) => {
    try {
        const result = await axios.patch(
            `${API_URL}/expense/${id}`, expense
        );
        if (result.status === 200) {
            return result.data;
        }
        notification.warning({
            message: 'Warning!',
            description: 'Something went wrong when updating'
        });
    } catch (e) {
        notification.error({
            message: 'Error!',
            description: 'Something went wrong when updating'
        });
    }
}
