import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const QuizGame = () => {
    const gameContainer = useRef(null);

    useEffect(() => {
        const quizData = [
            {
                question: "What is the capital of France?",
                choices: ["Paris", "Berlin", "Madrid", "Rome"],
                answer: 0,
            },
            {
                question: "Which planet is known as the Red Planet?",
                choices: ["Earth", "Mars", "Jupiter", "Venus"],
                answer: 1,
            },
            {
                question: "What is 2 + 2?",
                choices: ["3", "4", "5", "6"],
                answer: 1,
            },
        ];

        let currentQuestion = 0;
        let score = 0;
        let game;

        class QuizScene extends Phaser.Scene {
            constructor() {
                super({ key: "QuizScene" });
            }

            create() {
                this.displayQuestion();
            }

            displayQuestion() {
                this.clearScreen();
                const { question, choices, answer } = quizData[currentQuestion];

                this.add.text(200, 100, question, { fontSize: "24px", fill: "#fff" });

                choices.forEach((choice, index) => {
                    let btn = this.add.text(220, 180 + index * 50, choice, {
                        fontSize: "20px",
                        backgroundColor: "#007bff",
                        padding: { left: 10, right: 10, top: 5, bottom: 5 },
                    })
                        .setInteractive()
                        .on("pointerdown", () => this.checkAnswer(index, answer));
                });
            }

            checkAnswer(selected, correct) {
                if (selected === correct) {
                    score++;
                }
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    this.displayQuestion();
                } else {
                    this.showResult();
                }
            }

            showResult() {
                this.clearScreen();
                this.add.text(200, 200, `Game Over! Score: ${score}/${quizData.length}`, { fontSize: "24px", fill: "#fff" });
            }

            clearScreen() {
                this.children.removeAll();
            }
        }

        if (!gameContainer.current) return;

        game = new Phaser.Game({
            type: Phaser.AUTO,
            width: 600,
            height: 400,
            parent: gameContainer.current,
            scene: [QuizScene],
            backgroundColor: "#222",
        });

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={gameContainer} />;
};

export default QuizGame;
