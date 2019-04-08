export const findProductManagers = (products, managers) => {
    const managerIds = products.reduce((acc, product) => {
        return product.managerId ? [...acc, product.managerId] : acc
    }, [])
    return managers.filter(manager => managerIds.includes(manager.id))
}
