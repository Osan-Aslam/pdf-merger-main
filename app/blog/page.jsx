import React from 'react'

function Blog() {
  return (
    <div>
      <div className="w-full my-2 px-[70px] pb-[20px]">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap text-sm text-gray-600 space-x-2">
            <li>
              <a href="/" className="hover:underline text-blue-600">Home</a>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="/insights" className="hover:underline text-blue-600">Insights</a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500" aria-current="page">
              Active vs. Passive Voice: How to Use in a Sentence
            </li>
          </ol>
        </nav>
      </div>
      <div className="mb-10 flex justify-center px-4 content-section">
        <div className="w-full max-w-4xl">
          <article>
            <h1 className="text-3xl font-bold mb-4">
              Active vs. Passive Voice: How to Use in a Sentence
            </h1>
            <p className="mb-6">
              Active voice makes writing clear and powerful for the person doing the action, while passive voice is used when the subject receives the action. Let’s learn more about active versus passive voice.
            </p>

            {/* Author Section */}
            <div className="flex items-center space-x-3 mb-6">
              <a href="https://rewordgenerator.net/nancy-oliver">
                <img src="/placeholder-image.svg" alt="placeholder-image" loading="lazy" className="w-12 h-12 rounded-full" />
              </a>
              <div>
                <a href="https://rewordgenerator.net/nancy-oliver" className="text-blue-600 hover:underline">
                  Nancy Oliver
                </a>
                <div className="text-sm text-gray-600">
                  <p>Published on: 16-05-2025</p>
                  <p>Reviewed by: Amanda Montell</p>
                </div>
              </div>
            </div>

            {/* Table of Content Section */}
            <div className="py-6 border-t border-gray-300 space-y-4">
              <p>
                <strong>Active and passive voice</strong> are important for writing sentences, paragraphs, and articles that are easy to read. Fixing them isn't too hard, but good <strong>grammar</strong> matters to a lot of people.
              </p>
              <p>
                Statistics show that{" "}
                <a href="https://www.marketingprofs.com/charts/2021/45150/how-grammar-mistakes-influence-peoples-perceptions-of-companies" className="text-blue-600 underline">
                  94% of people in the US
                </a>{" "}
                and 86% of people from other countries pay attention to grammar.
              </p>
              <p>This guide will show you:</p>
              <ul className="list-disc list-inside">
                <li>What active and passive voice are.</li>
                <li>What the major differences are.</li>
                <li>Why it's important to use them in a sentence.</li>
              </ul>
              <p>
                Whether you're a student, a professional, or just want to get better at writing, learning <strong>active vs. passive voice</strong> will make it easier for you to share your ideas. Let's get started and make your writing more powerful.
              </p>
            </div>

            {/* More content goes here... */}

            <h2 className="text-2xl font-semibold mt-8 mb-4">Active vs. Passive Voice</h2>
            <p className="mb-4">
              In English, you can write sentences in two ways: active or passive voice...
              <a href="/introduction-to-paraphrasing" className="text-blue-600 underline">paraphrasing sentences</a>
            </p>

            {/* Example Section */}
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Active Voice</h3>
            <p className="mb-2">
              In active voice sentences, the subject performs the action expressed by the verb...
              <a href="/" className="text-blue-600 underline">reword generator</a>
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>The student wrote the essay. <strong>(Subject = the student, Verb = wrote, Object = the essay)</strong></li>
              <li>The chef prepared the meal. <strong>(Subject = the chef, Verb = prepared, Object = the meal)</strong></li>
              <li>The team won the championship. <strong>(Subject = the team, Verb = won, Object = the championship)</strong></li>
            </ul>

            {/* Continue for Passive Voice, tips, table, video etc. */}
            <div className="my-8">
              <iframe
                width="100%"
                height="315"
                title="YouTube video player"
                src="https://www.youtube.com/embed/W1_IRU6zx9g?si=AsX-WNmp9VyBzCHC"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-md"
              ></iframe>
            </div>

            {/* Example Table */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Active vs passive voice: The major difference between them</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-300 text-left text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 font-bold">Aspect</th>
                    <th className="px-4 py-2 font-bold">Active Voice</th>
                    <th className="px-4 py-2 font-bold">Passive Voice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Action</td>
                    <td className="px-4 py-2">Subject performs the action.</td>
                    <td className="px-4 py-2">Action happens to the subject.</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Linking Verb</td>
                    <td className="px-4 py-2">Does not require a linking verb.</td>
                    <td className="px-4 py-2">Uses a linking verb followed by the past participle.</td>
                  </tr>
                  {/* Add more rows... */}
                </tbody>
              </table>
            </div>

            {/* External Links */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">External Resources:</h2>
              <ul className="list-disc list-inside text-blue-600 underline space-y-1">
                <li><a href="https://byjus.com/govt-exams/active-and-passive-voice-rules/">Active and Passive Voice Rules</a></li>
                <li><a href="https://www.hunter.cuny.edu/rwc/repository/files/grammar-and-mechanics/verb-system/Active-and-Passive-Voice.pdf">Grammar and Mechanics</a></li>
                <li><a href="https://www.studyandexam.com/passive-voice-for-tense.html">Passive Voice Rules for All Tenses</a></li>
              </ul>
            </div>

            {/* Final Section */}
            <h2 className="text-2xl font-semibold mt-10 mb-4">Final Remarks</h2>
            <p className="mb-6">
              This guide helps you understand the difference between active and passive voice...
            </p>
          </article>
        </div>
      </div>

    </div>
  )
}

export default Blog
