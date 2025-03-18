import { Prisma } from '@prisma/client';
import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        });

        const {
            _sum: { amount: totalEarings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        });

        const {
            _sum: { amount: totalInvestments },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        });

        const _totalEarnings = totalEarings || new Prisma.Decimal(0);
        const _totalExpenses = totalExpenses || new Prisma.Decimal(0);
        const _totalInvestments = totalInvestments || new Prisma.Decimal(0);

        const balance = new Prisma.Decimal(
            _totalEarnings - _totalExpenses - _totalInvestments,
        );

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            invesments: _totalInvestments,
            balance,
        };
    }
}
