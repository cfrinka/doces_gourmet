const validFormFields = async ({
    productName,
    productPrice,
    productDescription,
    productCover
}) => {
    const errors = [];

    try {
        await axios.get(`https://cors-anywhere.herokuapp.com/${productCover}`, {
            responseType: 'arraybuffer'
        });
    } catch (error) {
        errors.push({
            field: 'productCoverError',
            message: '* URL inválida'
        })
    }

    const params = [{
            value: productName,
            field: 'productNameError',
            description: 'O nome do produto'
        },
        {
            value: productPrice,
            field: 'productPriceError',
            description: 'O preço'
        },
        {
            value: productDescription,
            field: 'productDescriptionError',
            description: 'A descrição do produto'
        },
        {
            value: productCover,
            field: 'productCoverError',
            description: 'A URL da imagem'
        }
    ];


    params.forEach(({
        value,
        field,
        description
    }) => {
        if (!value) {
            const customError = {
                message: `* ${description} é obrigatório`,
                field
            };

            errors.push(customError);
            return;
        }

        if (value.length < 5 || value.length > 300) {
            const customError = {
                message: `* O valor inserido é inválido`,
                field
            };

            errors.push(customError);

            return;
        }
    });

    if (errors.length) {
        throw errors;
    }

    return;

}