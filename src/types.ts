export interface Expense {
    id: number
    title: string;
    description?: string;
    category: string;
    amount: number;
    date?: Date;
}
