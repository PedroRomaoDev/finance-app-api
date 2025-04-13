import { prisma } from './prisma/prisma.js';

beforeEach(async () => {
    // console.log('Cleaning up database...');
    await prisma.user.deleteMany({});
    await prisma.transaction.deleteMany({});
});
