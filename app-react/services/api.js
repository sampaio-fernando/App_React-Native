

let items = []; // lista de itens em memória
let modules = []; // lista de módulos em memória


// ---------------------- REGISTRO FAKE ----------------------
export const register = async (username, password) => {
    if (username.trim() === "" || password.trim() === "") {
        throw new Error("Dados inválidos");
    }

    return { message: "Usuário registrado com sucesso" };
};

export const getItems = async () => {
    return items;
};

export const createItem = async (name) => {
    const newItem = {
        id: Date.now().toString(),
        name,
    };
    items.push(newItem);
    return newItem;
};

export const updateItem = async (id, name) => {
    const index = items.findIndex((i) => i.id === id);
    if (index !== -1) {
        items[index].name = name;
        return items[index];
    }
    throw new Error("Item não encontrado");
};

export const deleteItem = async (id) => {
    items = items.filter((i) => i.id !== id);
    return { message: "Item removido" };
};

// ---------------------- MODULES ----------------------
export const getModules = async () => {
    return modules;
};

export const createModule = async (name) => {
    const newModule = {
        id: Date.now().toString(),
        name,
    };
    modules.push(newModule);
    return newModule;
};

export const updateModule = async (id, name) => {
    const index = modules.findIndex((m) => m.id === id);
    if (index !== -1) {
        modules[index].name = name;
        return modules[index];
    }
    throw new Error("Módulo não encontrado");
};

export const deleteModule = async (id) => {
    modules = modules.filter((m) => m.id !== id);
    return { message: "Módulo deletado" };
};
