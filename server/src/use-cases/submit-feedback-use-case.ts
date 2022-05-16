import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        await this.feedbacksRepository.create(request)
    }
}