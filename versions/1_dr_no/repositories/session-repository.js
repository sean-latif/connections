class SessionRepository {
    sessions = {};

    startSession() {
        const sessionId = Math.floor(Math.random() * 100);
        this.sessions[sessionId] = {
            sessionId: sessionId,
            submissions: []
        };
        return sessionId;
    }

    addSubmission(sessionId, submission) {
        this.sessions[sessionId].submissions.push(submission);
    }

    getSubmissions(sessionId) {
        return this.sessions[sessionId].submissions;
    }
}