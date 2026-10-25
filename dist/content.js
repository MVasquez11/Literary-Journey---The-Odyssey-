/* Use plain text; blank values show placeholders for coursework still to be supplied.
   Separate paragraphs with two newlines. All seven analyses are prior course works, not Odyssey chapters.
   For a photo, put the image in assets/ and set photo to its relative path. */
window.PORTFOLIO = {
  student: {
    name: 'Marnel Rufo Vasquez',
    course: 'BSIT',
    year: '4th Year',
    section: '(GEC-GB-NRn) - 1454',
    photo: 'assets/marnel-vasquez.jpg',
    introduction: 'I’m Marnel Rufo Vasquez, a fourth-year BSIT student who enjoys gaming, watching movies, and good food. I appreciate stories that take me into different worlds and challenges that encourage me to think creatively. As I prepare for life beyond college, I aim to become more patient, adaptable, and open to new ideas. This portfolio brings together my interest in storytelling and my continuing growth as a student and a person.',
    interests: 'Movies are usually my first choice for enjoying a story, but I also appreciate literature that gives me something meaningful to think about. I am especially drawn to Homer’s works, particularly The Odyssey, because its journey connects adventure with perseverance, difficult choices, and the desire to reach a goal. I relate these ideas to finding my own direction in life. Exploring literature helps me consider different perspectives, reflect on my decisions, and understand the person I want to become.',
    expectations: 'My goal in Great Books is to understand how stories from different times and cultures can speak to my own life. I want to become more confident in interpreting characters, recognizing themes, and explaining my ideas using different literary lenses. As a BSIT student, I also hope to strengthen my communication, critical thinking, and understanding of others. Above all, I want to carry the lessons of these works into the choices I make beyond the classroom.'
  },
  analyses: Array.from({ length: 7 }, () => ({ title: '', author: '', lens: '', text: '' })),
  favorite: { reasons: '', influences: '', connections: '' },
  learning: { historical: '', lenses: '', human: '', skills: '' },
  reflection: { appreciation: '', challenges: '', approach: '', realizations: '', application: '' }
};
