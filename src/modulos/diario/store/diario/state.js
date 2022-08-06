
export default ()  => ({
    isLoading : true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Voluptate laborum ex sit labore duis excepteur qui adipisicing. Mollit proident qui anim tempor minim sunt ea sint. Elit enim ad et velit mollit eiusmod nostrud aute tempor nostrud consequat nisi.',
            picture: null,
        },
        {
            id: new Date().getTime()+1000,
            date: new Date().toDateString(),
            text: 'Qui Lorem exercitation commodo proident labore consequat mollit nostrud minim. Sit culpa ex voluptate exercitation ea elit pariatur anim in consequat. Ex consectetur non irure deserunt ad incididunt qui nisi. Sint duis cupidatat reprehenderit id ipsum ullamco amet ex.',
            picture: null,
        },
        {
            id: new Date().getTime()+2000,
            date: new Date().toDateString(),
            text: 'Qui cupidatat labore magna consectetur. Mollit dolore laboris ut non culpa enim ipsum tempor. Eiusmod est minim mollit exercitation. Est duis Lorem consectetur enim occaecat duis duis enim deserunt ipsum cupidatat commodo velit deserunt. Culpa aliqua deserunt officia mollit eu proident. Minim aliquip esse ex quis aliquip anim enim anim esse laboris.',
            picture: null,
        },
    ]
})