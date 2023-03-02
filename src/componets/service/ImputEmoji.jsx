import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

export default function ImputEmoji() {
    const [selectedEmoji, setSelectedEmoji] = useState ();

    function onClick(emojiData: EmojiClickData, event: MouseEvent) {
        setSelectedEmoji(emojiData);
    }

    return (
        <div>
            <header>
                {selectedEmoji ? (
                    <span>You chose: {selectedEmoji.emoji}</span>
                ) : (
                    <span>No emoji Chosen</span>
                )}
                <br />
                <EmojiPicker onEmojiClick={onClick} />
            </header>
        </div>
    );
}
