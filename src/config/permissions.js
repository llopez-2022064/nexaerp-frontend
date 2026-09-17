export const PERMISSIONS = {
    VIEW_DASHBOARD: 'view_dashboard',

    VIEW_USERS: 'view_users',
    CREATE_USERS: 'create_users',
    UPDATE_USERS: 'update_users',
    DELETE_USERS: 'delete_users',

    VIEW_PRODUCTS: 'view_products',
    CREATE_PRODUCTS: 'create_products',
    UPDATE_PRODUCTS: 'update_products',
    DELETE_PRODUCTS: 'delete_products',

    VIEW_INVENTORY: 'view_inventory',
    CREATE_INVENTORY: 'create_inventory',
    UPDATE_INVENTORY: 'update_inventory',
    DELETE_INVENTORY: 'delete_inventory',

    VIEW_INVENTORY_HISTORY: 'view_inventory_history',

    VIEW_PURCHASES: 'view_purchases',
    CREATE_PURCHASES: 'create_purchases',
    UPDATE_PURCHASES: 'update_purchases',
    DELETE_PURCHASES: 'delete_purchases',

    VIEW_SALES: 'view_sales',
    CREATE_SALES: 'create_sales',
    UPDATE_SALES: 'update_sales',
    DELETE_SALES: 'delete_sales',

    VIEW_SALES_REPORT: 'view_sales_report',
    VIEW_PURCHASES_REPORT: 'view_purchases_report',
    VIEW_INVENTORY_REPORT: 'view_inventory_report',
    VIEW_INVENTORY_HISTORY_REPORT: 'view_inventory_history_report'
}

export const ROLE_PERMISSIONS = {
    Administrador: Object.values(PERMISSIONS),

    Operativo: [
        PERMISSIONS.VIEW_DASHBOARD,

        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.CREATE_PRODUCTS,
        PERMISSIONS.UPDATE_PRODUCTS,

        PERMISSIONS.VIEW_INVENTORY,
        PERMISSIONS.VIEW_INVENTORY_HISTORY,

        PERMISSIONS.VIEW_PURCHASES,
        PERMISSIONS.CREATE_PURCHASES,

        PERMISSIONS.VIEW_SALES,
        PERMISSIONS.CREATE_SALES,

        PERMISSIONS.VIEW_SALES_REPORT,
        PERMISSIONS.VIEW_PURCHASES_REPORT,
        PERMISSIONS.VIEW_INVENTORY_REPORT
    ],

    Tecnico: [
        PERMISSIONS.VIEW_DASHBOARD,

        PERMISSIONS.VIEW_PRODUCTS,
        PERMISSIONS.CREATE_PRODUCTS,
        PERMISSIONS.UPDATE_PRODUCTS,

        PERMISSIONS.VIEW_INVENTORY,
        PERMISSIONS.CREATE_INVENTORY,
        PERMISSIONS.UPDATE_INVENTORY,
        PERMISSIONS.VIEW_INVENTORY_HISTORY,

        PERMISSIONS.VIEW_INVENTORY_REPORT,
        PERMISSIONS.VIEW_INVENTORY_HISTORY_REPORT
    ]
}

export const hasPermission = (role, permission) => {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}
