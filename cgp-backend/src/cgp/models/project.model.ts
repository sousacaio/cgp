export class Project {
    constructor(
        public coordinator: String,
        public collaborators: [],
        public comments: [],
        public title: String,
        public active: Boolean,
        public category: String,
        public directionedTo: String,
        public department: String,
        public awaitedResults: String,
        public benefited: String,
    ) { }
}