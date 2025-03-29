class SessionService {
    #repo;

    constructor(repo) {
        this.#repo = repo;
    }
    
    startSession() {
        return this.#repo.startSession();
    }

    addSubmission(sessionId, submission) {
        this.#repo.addSubmission(sessionId, submission);
    }

    getSubmissions(sessionId) {
        return this.#repo.getSubmissions(sessionId);
    }
}