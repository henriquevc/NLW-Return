import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {

        const {type, comment, screenshot} = request

        if (!type) {
            throw new Error('type is required')
        }

        if (!comment) {
            throw new Error('comment is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
            throw new Error('Invalid screenshot')
        }

        await this.feedbacksRepository.create(request)

        await this.mailAdapter.sendMail({
            subject: 'Feedback do usuário',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Novo feedback de ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}