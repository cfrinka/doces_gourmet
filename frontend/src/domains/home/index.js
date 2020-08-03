$(document).ready(function () {
    $(".ValoresItens").maskMoney({
        prefix: "R$ ",
        decimal: ",",
        thousands: "."
    });
});

const showPage = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-information').style.display = 'flex';
}

const loadProducts = async () => {
    const {
        data
    } = await listProducts();

    const mainContainer = document.getElementById('main-container');

    data.forEach(item => {
        const product = createDiv(item);

        mainContainer.insertAdjacentHTML('beforeend', product);
    });

    setTimeout(() => {
        showPage();
    }, 2000);
}

const callRepositoryToCreateOrUpdate = async (id, inputsValues) => {
    let isUpdate = false;

    if (id) {
        await updateProduct({
            id,
            ...inputsValues
        });

        isUpdate = true;
        return isUpdate;

    }

    await createProduct(inputsValues);
    return isUpdate;

}

const resolvePrice = async (price) => {
    if (!price) {
        return null;
    }

    const priceWithoutPoint = price.replace(/\./g, "");
    const value = priceWithoutPoint.replace(/\,/g, ".");
    const valueWithouMask = /\d+.\d+/.exec(value)[0].toString();
    return +valueWithouMask;
}

const callFinishModalState = (isUpdate) => {
    const modalContent = document.getElementById('modalContent');
    const finishModal = document.getElementById('finishModalState');
    const finishText = document.getElementById('finishText');
    finishText.innerText = isUpdate ?
        'Produto atualizado!' :
        'Produto adicionado!';

    modalContent.remove();
    finishModal.style.display = 'flex';

    setTimeout(() => {
        window.location.reload();
    }, 1000);
};

const createOrUpdateProducts = async () => {
    initModlaLoading();

    try {
        const form = document.getElementById('createOrUpdateProduct');

        const {
            identifier: {
                value: identifierValue
            },
            productName,
            productPrice,
            productDescription,
            productCover
        } = form;

        const price = await resolvePrice(productPrice.value);

        await validFormFields({
            productName: productName.value,
            productPrice: price,
            productDescription: productDescription.value,
            productCover: productCover.value
        });

        const inputsValues = {
            productName: productName.value,
            productPrice: price,
            productDescription: productDescription.value,
            productCover: productCover.value
        }

        const isUpdate = await callRepositoryToCreateOrUpdate(identifierValue, inputsValues);

        stopModlaLoading();

        return callFinishModalState(isUpdate);

    } catch (error) {
        stopModlaLoading();

        if (error.length) {
            error.forEach(item => {
                const element = document.getElementById(item.field);
                element.innerText = item.message;
                element.style.display = "block";
            });
        }

    }
}

const removeProduct = async (id) => {
    try {
        const [, resolvedId] = id.split('-');
        await deleteProducts(resolvedId);

        const elem = document.getElementById(id);
        elem.remove();
    } catch (error) {
        alert('Deu ruim');
    }

}

loadProducts();