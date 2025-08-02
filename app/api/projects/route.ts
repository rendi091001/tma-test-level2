// /app/api/products/raw/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const result = await prisma.$queryRaw`
        SELECT o.owner_name, p.product_name, p.product_brand, p.product_date FROM product_owners po 
            JOIN products p on po.products_id = p.product_id
            JOIN owners o on po.owners_id = o.id
    `;
        // console.log(result)
        return NextResponse.json(result);
    } catch (error) {
        console.error('Query failed:', error);
        return NextResponse.json({ error: 'Query raw failed' }, { status: 500 });
    }
}
