export function getAnimals(state) {
    let mixedList = state.animals.splice(0, 6);
    mixedList = mixedList.reduce((res, current) => [...res, current, current], []);
    mixedList = mixedList.sort((a, b) => Math.random() - .5)
    return mixedList.map((item, index) => {
        return {
            id: index,
            imageUrl: item.fields.image.url,
            alt: item.fields.image.title,
            isFront: true,
            discovered: false,
            disabled: false,
        };
    })
}
