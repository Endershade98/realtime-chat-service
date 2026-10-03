// tests/unit/application/conversation/get-conversation-messages-usecase.test.js

const GetConversationMessagesUseCase =
require('../../../../src/application/use-cases/conversation/GetConversationMessagesUseCase');

describe('GetConversationMessagesUseCase', () => {

  it('should return messages', async () => {

    const repo = {
      findByConversation: jest.fn(async () => [
        { content: 'hello' },
        { content: 'world' }
      ])
    };

    const useCase =
      new GetConversationMessagesUseCase(repo);

    const result =
      await useCase.execute({
        conversationId: '123'
      });

    expect(repo.findByConversation)
      .toHaveBeenCalledWith('123');

    expect(result.length).toBe(2);
  });

});