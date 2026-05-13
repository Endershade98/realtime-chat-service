// tests/unit/application/message/send-message-usecase.test.js

const SendMessageUseCase =
require('../../../../src/application/use-cases/message/SendMessageUseCase');

describe('SendMessageUseCase', () => {

  it('should send message and publish event', async () => {

    const fakeConversation = {
      addMessage: jest.fn(() => ({
        content: 'hello'
      })),
      pullEvents: jest.fn(() => [
        { event: 'MESSAGE_SENT' }
      ])
    };

    const conversationRepo = {
      findById: jest.fn(async () => fakeConversation),
      save: jest.fn(async c => c)
    };

    const messageRepo = {
      save: jest.fn(async m => m)
    };

    const bus = {
      publish: jest.fn(async () => {})
    };

    const useCase =
      new SendMessageUseCase(
        conversationRepo,
        messageRepo,
        bus
      );

    const result =
      await useCase.execute({
        conversationId: '123',
        senderId: '456',
        content: 'hello'
      });

    expect(conversationRepo.findById)
      .toHaveBeenCalled();

    expect(fakeConversation.addMessage)
      .toHaveBeenCalled();

    expect(messageRepo.save)
      .toHaveBeenCalled();

    expect(bus.publish)
      .toHaveBeenCalled();

    expect(result.content).toBe('hello');
  });

  it('should throw if conversation not found', async () => {

    const useCase =
      new SendMessageUseCase(
        {
          findById: jest.fn(async () => null),
          save: jest.fn()
        },
        { save: jest.fn() },
        { publish: jest.fn() }
      );

    await expect(
      useCase.execute({
        conversationId: '1',
        senderId: '2',
        content: 'x'
      })
    ).rejects.toThrow(
      'Conversation not found'
    );
  });

});