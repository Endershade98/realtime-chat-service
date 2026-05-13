// tests/unit/application/conversation/create-conversation-usecase.test.js

const CreateConversationUseCase =
  require('../../../../src/application/use-cases/conversation/CreateConversationUseCase');

describe('CreateConversationUseCase', () => {

  it('should create conversation and publish ConversationCreated event', async () => {

    const repo = {
      save: jest.fn(async c => c)
    };

    const bus = {
      publish: jest.fn(async () => {})
    };

    const useCase =
      new CreateConversationUseCase(repo, bus);

    await useCase.execute({
      title: 'General Chat'
    });

    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(bus.publish).toHaveBeenCalledTimes(1);

    const event = bus.publish.mock.calls[0][0];

    // 🔥 FIX: access corretto
    expect(event.type).toBe('CONVERSATION_CREATED');

    expect(event.data.title).toBe('General Chat');
  });

});