const defaultErrors = ['productCoverError', 'productNameError', 'productPriceError', 'productDescriptionError'];
const loading = document.getElementById('modal-loader');

const resolveModalData = async ({
    id,
    productName: name,
    productDescription: description,
    productPrice: price,
    productCover: cover
} = {}) => {
    const form = document.getElementById('createOrUpdateProduct');
    const createOrUpdateTitle = document.getElementById('createOrUpdateTitle');
    const addOrUpdateProduct = document.getElementById('addOrUpdateProduct');
    const identifierInput = document.getElementById('identifier');

    const {
        productName,
        productPrice,
        productDescription,
        productCover
    } = form;

    if (!id) {
        productName.value = null;
        productPrice.value = null;
        productDescription.value = null;
        productCover.value = null;

        createOrUpdateTitle.innerText = 'Novo Produto';
        addOrUpdateProduct.innerText = 'Adicionar produto';
        identifierInput.value = null;

        return;
    }

    productName.value = name;
    productPrice.value = price;
    productDescription.value = description;
    productCover.value = cover;

    createOrUpdateTitle.innerText = 'Atualizar Produto';
    addOrUpdateProduct.innerText = 'Atualizar';
    identifierInput.value = id;

    return;
}

const clearError = (input) => {
    const element = document.getElementById(input);
    element.style.display = 'none';
    return;
}

const initModlaLoading = () => {
    loading.style.display = 'block';
}

const stopModlaLoading = () => {
    loading.style.display = 'none';
}

const openAddOrEditProductModal = async (
    id,
    productName,
    productDescription,
    productPrice,
    productCover
) => {
    const params = {
        id,
        productName,
        productDescription,
        productPrice,
        productCover
    };

    defaultErrors.forEach(item => clearError(item));

    const modal = document.getElementById("addOrUpdateProductModal");
    const closeButton = document.getElementsByClassName("close")[0];

    await resolveModalData(params);

    modal.style.display = 'block';

    document.getElementById('product-price').focus();
    document.getElementById('product-price').blur();

    closeButton.onclick = async () => {
        modal.style.display = 'none';
        await resolveModalData();
    }

    window.onclick = async (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            await resolveModalData();
        }
    }
}