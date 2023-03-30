declare interface CreateAdminQueryParams {
    username: string,
    password: Buffer,
    name: string,
    email: string,
    mobile: string,
    salt: Buffer,
    is_super_admin: boolean
}

declare type DepartmentWithAdmin = Prisma.DepartmentGetPayload<{
    include: {
        Admin: true,
    }
}>;