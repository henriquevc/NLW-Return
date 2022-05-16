import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)

describe('submit feedback', () => {
    it('should  be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'test',
            screenshot: 'data:image/png;base64,test'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'test',
            screenshot: 'data:image/png;base64,test'
        })).rejects.toThrow()
    })

    it('should not be able submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: '',
            screenshot: 'data:image/png;base64,test'
        })).rejects.toThrow()

    })

    it('should not be able submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'test',
            screenshot: 'test'
        })).rejects.toThrow()
    })
})