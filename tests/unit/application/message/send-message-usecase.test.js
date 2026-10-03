// tests/unit/application/message/send-message-usecase.test.js

const { v4: uuidv4 } = require('uuid');

const SendMessageUseCase =
  require('../../../../src/application/use-cases/message/SendMessageUseCase');

const ConversationId =
  require('../../../../src/domain/value-objects/ConversationId');

const UserId =
  require('../../../../src/domain/value-objects/UserId');

describe('SendMessageUseCase', () => {

  it('should send message and publish event', async () => {

    const conversationId = uuidv4();
    const senderId = uuidv4();

    const fakeConversation = {
      hasParticipant: jest.fn(() => true)
    };

    const messageRepo = {
      save: jest.fn(async (m) => m)
    };

    const conversationRepo = {
      findById: jest.fn(async () => fakeConversation)
    };

    const bus = {
      publish: jest.fn(async () => {})
    };

    const useCase =
      new SendMessageUseCase(
        messageRepo,
        conversationRepo,
        bus
      );

    const result =
      await useCase.execute({
        conversationId,
        senderId,
        content: 'hello'
      });

    expect(conversationRepo.findById)
      .toHaveBeenCalledWith(
        expect.any(ConversationId)
      );

    expect(fakeConversation.hasParticipant)
      .toHaveBeenCalledWith(
        expect.any(UserId)
      );

    expect(messageRepo.save)
      .toHaveBeenCalled();

    expect(bus.publish)
      .toHaveBeenCalled();

    expect(result.content)
      .toBe('hello');
  });

  it('should throw if conversation not found', async () => {

    const messageRepo = {
      save: jest.fn()
    };

    const conversationRepo = {
      findById: jest.fn(async () => null)
    };

    const bus = {
      publish: jest.fn()
    };

    const useCase =
      new SendMessageUseCase(
        messageRepo,
        conversationRepo,
        bus
      );

    await expect(
      useCase.execute({
        conversationId: uuidv4(),
        senderId: uuidv4(),
        content: 'x'
      })
    ).rejects.toThrow(
      'Conversation not found'
    );
  });

  it('should throw if sender is not participant', async () => {

    const fakeConversation = {
      hasParticipant: jest.fn(() => false)
    };

    const messageRepo = {
      save: jest.fn()
    };

    const conversationRepo = {
      findById: jest.fn(async () => fakeConversation)
    };

    const bus = {
      publish: jest.fn()
    };

    const useCase =
      new SendMessageUseCase(
        messageRepo,
        conversationRepo,
        bus
      );

    await expect(
      useCase.execute({
        conversationId: uuidv4(),
        senderId: uuidv4(),
        content: 'hello'
      })
    ).rejects.toThrow(
      'Sender is not part of conversation'
    );
  });

});