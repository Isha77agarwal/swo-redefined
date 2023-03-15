declare interface CreateAdminParams {
    username: string,
    password: string,
    department_id?: string,
    name: string,
    email: string,
    mobile: string,
    is_super_admin?: boolean
}