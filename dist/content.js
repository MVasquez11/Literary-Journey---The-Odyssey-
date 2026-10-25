/* Personal content can be supplied later. Use plain text; blank values show honest placeholders.
   Separate paragraphs with two newlines. All seven analyses are prior course works, not Odyssey chapters.
   For a photo, put the image in assets/ and set photo to its relative path. */
window.PORTFOLIO = {
  student: { name: '', course: '', year: '', section: '', photo: '', introduction: '', interests: '', expectations: '' },
  analyses: Array.from({ length: 7 }, () => ({ title: '', author: '', lens: '', text: '' })),
  favorite: { reasons: '', influences: '', connections: '' },
  learning: { historical: '', lenses: '', human: '', skills: '' },
  reflection: { appreciation: '', challenges: '', approach: '', realizations: '', application: '' }
};
