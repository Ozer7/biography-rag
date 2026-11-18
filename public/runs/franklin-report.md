# Biography RAG run — Benjamin Franklin

Run run-2026-11-18T21-04-13-037Z · 2026-11-18T21:04:13.037Z · app v1.0.0

Corpus: 6 documents, ~1459 pages, 3249 chunks · embeddings: all-MiniLM-L6-v2 (int8 ONNX, 384-d, mean pooling)

- D1: 01-autobiography-franklin.txt (~224 pages)
- D2: 02-true-benjamin-franklin-fisher-1899.txt (~348 pages)
- D3: 03-boyhood-to-manhood-thayer.txt (~406 pages)
- D4: 04-benjamin-franklin-abbott-1876.txt (~266 pages)
- D5: 05-life-of-franklin-goodrich.txt (~134 pages)
- D6: 06-benjamin-franklin-more-1900.txt (~81 pages)

---

# The Life of Benjamin Franklin

Benjamin Franklin was born in Boston on January 6, 1706, according to some records, while another source states he was born on January 17, 1706. [D6-C0007, D5-C0010] His father, Josiah Franklin, was a man of honest industry who lived in Boston, and his ancestors had long lived in Northamptonshire as smiths. [D6-C0004, D5-C0010] ⚠️FLAG His mother was Abiah Folger, the daughter of Peter Folger. [D3-C0057] He came from a large family of seventeen children and was celebrated from early childhood for his physical beauty, athletic vigor, and imperturbable good nature. [D4-C0026, D5-C0010]

At the age of eight, Benjamin was sent to grammar school and studied under Mr. George Brownell, but his formal schooling ended at ten when he began working in his father's shop. [D6-C0008, D4-C0028, D3-C0107] He was passionately fond of reading from childhood and spent all his savings on books. [D6-C0013] After a brief attempt at learning the cutler trade, it was decided to bind him as an apprentice to his older brother James to learn the trade of a printer. [D4-C0036, D4-C0037, D3-C0174] Working in a printing office served as a school where he laid the foundation of his learning and fame, while also forming habits of punctuality and temperance. [D3-C0299, D3-C0195, D2-C0084]

In 1723, he undertook a perilous and adventurous journey from New York to Philadelphia, traveling without food or water for thirty hours, enduring rain, and trudging through a wilderness where he was suspected of being a runaway servant. [D4-C0077, D5-C0039, D6-C0027] During another boat journey, a squall struck his vessel, pitching a passenger overboard whom Franklin saved by catching him by the hair. [D4-C0076] On September 1, 1730, Franklin married Deborah Read, who made him a good wife. [D6-C0065, D6-C0067] ⚠️FLAG They had children together, including a son who died as a child and a daughter named Sarah, and Franklin also brought home his illegitimate son William. [D6-C0067, D2-C0244]

Franklin engaged in extensive scientific pursuits and is best known for his discovery of the nature of lightning through his kite experiment. [D3-C0855] (warn) He discovered and described positive and negative electricity, invented an open stove in 1742 for better warming rooms while saving fuel, and announced the invention of the lightning-rod. [D2-C0363, D2-C0364, D1-C0294] Known for his strong sense of humor, he often used jokes and witticisms to relieve tension and restore good humor in Congress. [D4-C0495, D2-C0031]

Benjamin Franklin passed away at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his final words. [D4-C0639] He is remembered as one of the wisest of men, and his memory has been cherished with reverence and affection throughout the civilized world. [D4-C0639]

_Not in the sources, so left out of the story: Q11 Hardest time._

---

## Log review (automatic)

- Queries answered from the sources: **19/20**
- "Not in the sources": Q11
- Sentences checked (answers + story): 75 → 71 ok, 2 warnings, 2 flagged
- Story sentences with a valid chunk ID: **17/17**
- Answer sentences dropped before the story because they failed checks: 0
- LLM audit of the story (second pass, snippets only): 17 supported, 0 partial, 0 unsupported

### Canary test

- ✅ PASS — Did Benjamin Franklin invent bifocal spectacles? → **not in the sources** (the LLM said not in the sources)
- ✅ PASS — Which U.S. banknote carries Benjamin Franklin's portrait today? → **not in the sources** (the LLM said not in the sources)
- ✅ PASS — Did Benjamin Franklin serve on the 1784 French royal commission that investigated Franz Mesmer's animal magnetism? → **not in the sources** (the LLM said not in the sources)

### Flagged sentences

- **Q18** (warn): He also spent time living and traveling in places such as London, the west of England, and Wales.
  - low_overlap: only 44% of content words appear in cited chunks
- **story** (flag): His father, Josiah Franklin, was a man of honest industry who lived in Boston, and his ancestors had long lived in Northamptonshire as smiths.
  - outside_detail: not found in cited chunks: Josiah
- **story** (flag): On September 1, 1730, Franklin married Deborah Read, who made him a good wife.
  - outside_detail: not found in cited chunks: Deborah
- **story** (warn): Franklin engaged in extensive scientific pursuits and is best known for his discovery of the nature of lightning through his kite experiment.
  - low_overlap: only 42% of content words appear in cited chunks

---

## Query logs

### Q1. Where and when was Benjamin Franklin born?

**Status:** answered

**Search phrasings:** “Where and when was Benjamin Franklin born?” · “Benjamin Franklin was born in the town of, in the year” · “the birth of Benjamin Franklin, born on the day”

**Retrieval gate:** best cosine 0.7475 (min 0.3), best BM25 20.014 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0054 | 0.5705 | 0.365 | 20.014 | On the "Old Boston Town Records of Births," under the heading, "Boston Births Entered 1708… |
| 2 | D3-C0096 | 0.5475 | 0.2732 | 7.999 | J.F., BORN 1655, DIED 1744, AET. 89. A.F., BORN 1667, DIED 1752, AET. 85." We may say here… |
| 3 | D6-C0007 | 0.7475 | 0.4854 | 14.637 | But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence.… |
| 4 | D5-C0010 | 0.5888 | 0.2524 | 11.851 | LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Tr… |
| 5 | D3-C0207 | 0.5426 | 0.2472 | 9.399 | He died just four years before I was born, on the same day of the same month." Such kind o… |
| 6 | D4-C0024 | 0.5733 | 0.3236 | 7.5 | Soon after the birth of Benjamin, his father removed to a humble but comfortable dwelling … |
| 7 | D3-C0005 (nav) | 0.6342 | 0.3847 | 16.778 | II. THE FIFTEENTH GIFT. Birth of Benjamin Franklin on Sunday--The Fifteenth Child--God's G… |
| 8 | D2-C0153 (nav) | 0.5894 | 0.3717 | 11.049 | FOOTNOTES: [2] Pennsylvania: Colony and Commonwealth, p. 80. [3] Pennsylvania: Colony and … |

**Answer (each sentence checked):**

- Benjamin Franklin was born in Boston. [D6-C0007]
- According to some records he was born on January 6, 1706 (old style), while another source states he was born on the seventeenth of January, 1706. [D6-C0007, D5-C0010]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Where and when was Benjamin Franklin born?

Source snippets:
[D3-C0054] (from 03-boyhood-to-manhood-thayer.txt)
On the "Old Boston Town Records of Births," under the heading, "Boston Births Entered 1708," is this: "Benjamin, son of Josiah Franklin, and Abiah, his wife, born 6 Jan. 1706." From some mistake or oversight the birth was not recorded until two years after Benjamin was born; but it shows that he was born on Jan. 6, 1706. Then, the records of the "Old South Church," among the baptism of infants, have this: "1706, Jan. 6, Benjamin, son of Josiah and Abiah Franklin." Putting these two records together, they establish beyond doubt the fact that Benjamin Franklin was born and baptized on the same day. The Old South Church had two pastors then, and it is supposed that Dr. Samuel Willard officiated instead of Rev. Ebenezer Pemberton, because the record is in the handwriting of Doctor Willard.

[D3-C0096] (from 03-boyhood-to-manhood-thayer.txt)
J.F., BORN 1655, DIED 1744, AET. 89. A.F., BORN 1667, DIED 1752, AET. 85." We may say here that the stone which Doctor Franklin erected, as above, became so dilapidated that in 1827, the citizens of Boston replaced it by a granite obelisk. The bodies repose in the old Granary cemetery, beside Park-street church. * * * * * It was arranged that Benjamin should begin his school-days, and enjoy the best literary advantages which the poverty of his father could provide. He acceded to the plan with hearty good-will, and commenced his studies with such zeal and enthusiasm as few scholars exhibit.

[D6-C0007] (from 06-benjamin-franklin-more-1900.txt)
But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence. Benjamin Franklin was born in Boston, January 6 (old style), 1706. At that time the family home was in Milk Street, opposite the Old South Church, to which sacred edifice the child was taken the day of his birth, tradition asserting that his own mother carried him thither through the snow. Shortly afterwards the family moved to a wooden house on the corner of Hanover and Union streets.

[D5-C0010] (from 05-life-of-franklin-goodrich.txt)
LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D3-C0207] (from 03-boyhood-to-manhood-thayer.txt)
He died just four years before I was born, on the same day of the same month." Such kind of men are not given to foolish conversation. They are too sensible to indulge in mere twaddle about the weather. Their talents raise them to a higher plane of thought and remark. Josiah Franklin only observed the custom of his ancestors, no doubt unwittingly, when he sought to improve the minds and hearts of his children by instructive conversation at the table and fireside. Benjamin had a right to claim for it a decided educational influence in the family.

[D4-C0024] (from 04-benjamin-franklin-abbott-1876.txt)
Soon after the birth of Benjamin, his father removed to a humble but comfortable dwelling at the corner of Hanover and Union streets. Here he passed the remainder of his days. When Franklin had attained the age of five years, a terrible conflagration took place, since known as the Great Boston Fire. Just as the cold blasts of winter began to sweep the streets, this great calamity occurred. The whole heart of the thriving little town was laid in ashes. Over a hundred families found themselves in destitution in the streets. An incident took place when Franklin was about seven years of age, which left so indelible an impression upon his mind, that it cannot be omitted in any faithful record of his life. He gave the following account of the event in his autobiography, written after the lapse of sixty-six years:

[D3-C0005] (from 03-boyhood-to-manhood-thayer.txt)
II. THE FIFTEENTH GIFT. Birth of Benjamin Franklin on Sunday--The Fifteenth Child--God's Gift--Proposition to Baptize Him the Same Day--Discussion over It--Baptized on That Day by Doctor Willard--The Church Record--House in Which He was Born--Josiah's Children--Death of Wife and Second Marriage--The Folger Family--Name for Uncle Benjamin--Personal Beauty--Words of Parton--Josiah Took Up Trade of Tallow-chandler--The Business and Place Described--Sons Apprenticed--Josiah a Good Musician--Condition of the World When Benjamin was Born in 1706. III. PAYING TOO DEAR FOR THE WHISTLE.

[D2-C0153] (from 02-true-benjamin-franklin-fisher-1899.txt)
FOOTNOTES: [2] Pennsylvania: Colony and Commonwealth, p. 80. [3] Pennsylvania: Colony and Commonwealth, p. 141. [4] Pennsylvania: Colony and Commonwealth, pp. 374-377, 381. III RELIGION AND MORALS Franklin’s father and mother were Massachusetts Puritans who, while not conspicuously religious, attended steadily to their religious duties. They lived in Milk Street, Boston, near the Old South Church, and little Benjamin was carried across the street the day he was born and baptized in that venerable building. He was born on Sunday, January 6, 1706 (Old Style), and if it had occurred in one of the Massachusetts towns where the minister was very strict, baptism might have been refused, for some of the Puritans were so severe in their views of Sabbath-keeping that they said a child born on the Sabbath must have been conceived on the Sabbath, and was therefore hopelessly unregenerate.[5]

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin was born in Boston.",
      "chunk_ids": [
        "D6-C0007"
      ]
    },
    {
      "text": "According to some records he was born on January 6, 1706 (old style), while another source states he was born on the seventeenth of January, 1706.",
      "chunk_ids": [
        "D6-C0007",
        "D5-C0010"
      ]
    }
  ]
}
```
</details>

### Q2. Where were Benjamin Franklin's parents from, and what did they do?

**Status:** answered

**Search phrasings:** “Where were Benjamin Franklin's parents from, and what did they do?” · “Benjamin Franklin's father and mother, where they came from” · “Benjamin Franklin's father's trade and occupation; the family emigrated from”

**Retrieval gate:** best cosine 0.6873 (min 0.3), best BM25 14.431 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0079 | 0.6426 | 0.3996 | 10.035 | From this grandfather on his mother’s side Franklin no doubt inherited his fondness for bo… |
| 2 | D3-C0199 | 0.6248 | 0.3563 | 11.092 | Franklin claimed that this feature of family government exerted a moulding influence upon … |
| 3 | D2-C0453 | 0.5896 | 0.3324 | 7.802 | The birth of Temple and his parentage were probably not generally known among Franklin’s E… |
| 4 | D6-C0004 | 0.6117 | 0.393 | 13.075 | Franklin's ancestors were of the sturdy sort that have made the strength of the Anglo-Saxo… |
| 5 | D5-C0010 | 0.6873 | 0.3989 | 12.689 | LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Tr… |
| 6 | D3-C0819 | 0.5891 | 0.3081 | 14.431 | "That is all blotted out now," continued James, "I have one request to make, and, if you c… |
| 7 | D3-C0057 | 0.6173 | 0.3324 | 7.932 | So young and large a family needed a mother's watch and care, as Josiah Franklin found to … |
| 8 | D4-C0248 | 0.6797 | 0.3694 | 5.438 | "When boys see prizes brought in, and quantities of money shared among the men, and their … |

**Answer (each sentence checked):**

- For many generations, Franklin's ancestors on his father's side lived in the village of Ecton, Northamptonshire, where father and son had been smiths. [D6-C0004]
- His father, Josiah Franklin, was a man of honest industry who lived in Boston, while his mother was Abiah Folger of Nantucket, the daughter of Peter Folger. [D5-C0010, D3-C0057]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Where were Benjamin Franklin's parents from, and what did they do?

Source snippets:
[D2-C0079] (from 02-true-benjamin-franklin-fisher-1899.txt)
From this grandfather on his mother’s side Franklin no doubt inherited his fondness for books, a fondness that was reinforced by a similar tendency which, though not very strong in his father, evidently existed in his father’s family, as Uncle Benjamin’s verses show. These verses sent to the boy Franklin and his efforts at times to answer them were an encouragement towards reading and knowledge. Franklin’s extremely liberal views may possibly have had their origin in his maternal grandfather, Peter Folger.

[D3-C0199] (from 03-boyhood-to-manhood-thayer.txt)
Franklin claimed that this feature of family government exerted a moulding influence upon his life and character. It caused him to value profitable conversation in boyhood and youth. In manhood he frequently found himself posted upon subjects made familiar to him by conversation at the table and hearthstone of his boyhood, especially topics relating to the mother country. He was more particularly edified by conversation at home during the four years that "Uncle Benjamin" was a member of his father's family. For this favorite "Uncle" was a very instructive talker, having been educated by the conversation of his father at home in England, as his nephew Benjamin was by his father in Boston. When "Uncle Benjamin" was very old, he could even recall the expressions which his father used in prayer at the family altar, and he wrote some of them in one of his books of poetry, as follows: "Holy Father, into thy hand we commit our spirits, for thou hast redeemed them, O Lord God of Truth."

[D2-C0453] (from 02-true-benjamin-franklin-fisher-1899.txt)
The birth of Temple and his parentage were probably not generally known among Franklin’s English friends during this first mission. It has been said also that William’s illegitimacy was not known in London, but this is unlikely. It did not, however, interfere with the young man’s advancement; for in 1762, just before Franklin returned to America, William was appointed by the crown governor of New Jersey. This honor, it is said, was entirely unsolicited by either father or son, and the explanation usually given is that it was intended to attach the father more securely to the royal interest in the disputes which were threatening between the colonies and the mother country.

[D6-C0004] (from 06-benjamin-franklin-more-1900.txt)
Franklin's ancestors were of the sturdy sort that have made the strength of the Anglo-Saxon race. For three hundred years at least his family had lived on a freehold of thirty acres in the village of Ecton, Northamptonshire; and for many generations father and son had been smiths. Parton, in his capital Life of Franklin, has observed that Washington's ancestors lived in the same county, although much higher in the social scale; and it may well have been that more than one of Franklin's ancestors "tightened a rivet in the armor or replaced a shoe upon the horse of a Washington, or doffed his cap to a Washington riding past the ancestral forge." During these long years the family seems to have gathered strength from the soil, as families are wont to do. Seeing how the Franklins, when the fit of emigrating seized upon them, blossomed out momentarily, and then dwindled away, we are reminded of Poor Richard's wise observation,--

[D5-C0010] (from 05-life-of-franklin-goodrich.txt)
LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D3-C0819] (from 03-boyhood-to-manhood-thayer.txt)
"That is all blotted out now," continued James, "I have one request to make, and, if you can grant it, I shall be very happy." "What is it?" "My son is now ten years old, and the loss of his father will, indeed, be a great loss to him. I had intended to instruct him in my trade; and, after my death, I want you should take him to your home in Philadelphia, where he can learn the printer's trade, and, when he understands the business well, return him to his mother and sisters, who will continue the printing house here." "With all my heart I will do it; and I am glad to grant this favor, not only for your sake, but for my own," responded Benjamin. "He shall be one of my family, and I will be to him as a father, and he shall be to me as a son." Thus, at the grave's side, the two brothers were thoroughly reconciled to each other, and it was not long before Franklin had James' son in his own family.

[D3-C0057] (from 03-boyhood-to-manhood-thayer.txt)
So young and large a family needed a mother's watch and care, as Josiah Franklin found to his sorrow. The additional burden laid upon him by the death of his wife interfered much with his business, and he saw fresh reasons each day for finding another help-mate as soon as possible. To run his business successfully, and take the whole charge of his family, was more than he could do. In these circumstances he felt justified in marrying again as soon as possible, and, with the aid of interested friends, he made a fortunate choice of Abiah Folger, of Nantucket, a worthy successor of the first Mrs. Franklin. He married her a few months after the death of his first wife. The second Mrs. Franklin became the mother of ten children, which, added to those of the first Mrs. Franklin, constituted a very respectable family of seventeen children, among whom was Benjamin, the fifteenth child. His "Autobiography" says: "Of the seventeen children I remember to have seen thirteen sitting together at the table, who all grew up to years of maturity and were married." Of the second wife it says: "My mother, the second wife of my father, was Abiah Folger, daughter of Peter Folger, one of the first settlers of New England, of whom honorable mention is made by Cotton Mather in his ecclesiastical history of that country, 'as a godly and learned Englishman.'"

[D4-C0248] (from 04-benjamin-franklin-abbott-1876.txt)
"When boys see prizes brought in, and quantities of money shared among the men, and their gay living, it fills their heads with notions that half distract them; and puts them quite out of conceit with trades and the dull ways of getting money by working. My only son left my house unknown to us all, and got on board a privateer, from whence I fetched him. No one imagined it was hard usage at home that made him do this. Every one that knows me thinks I am too indulgent a parent, as well as master." The father of Benjamin Franklin died in Boston, at the great age of eighty-nine years. He had secured, in a very high degree, the respect of the people, not only by his irreproachable morals, but by his unfeigned piety. The Boston News Letter, of January 17, 1745, in the following brief obituary, chronicles his death:

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "For many generations, Franklin's ancestors on his father's side lived in the village of Ecton, Northamptonshire, where father and son had been smiths.",
      "chunk_ids": [
        "D6-C0004"
      ]
    },
    {
      "text": "His father, Josiah Franklin, was a man of honest industry who lived in Boston, while his mother was Abiah Folger of Nantucket, the daughter of Peter Folger.",
      "chunk_ids": [
        "D5-C0010",
        "D3-C0057"
      ]
    }
  ]
}
```
</details>

### Q3. What was Benjamin Franklin's childhood like?

**Status:** answered

**Search phrasings:** “What was Benjamin Franklin's childhood like?” · “Benjamin Franklin as a young child, growing up, boyhood or girlhood” · “childhood games, early years and character of young Benjamin Franklin”

**Retrieval gate:** best cosine 0.6634 (min 0.3), best BM25 13.231 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0026 | 0.6621 | 0.4042 | 13.231 | From early childhood Franklin was celebrated for his physical beauty, his athletic vigor a… |
| 2 | D6-C0009 | 0.4848 | 0.3075 | 11.021 | When ten years old the lad was taken from school and set to work under his father. But his… |
| 3 | D5-C0010 | 0.6634 | 0.3371 | 7.543 | LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Tr… |
| 4 | D3-C0060 | 0.6052 | 0.3548 | 7.522 | Benjamin was more than a comely child; he was handsome. From babyhood to manhood he was so… |
| 5 | D3-C0049 | 0.6417 | 0.405 | 6.623 | Mr. Franklin spoke out of the depths of his soul. He was a true Christian man, and took th… |
| 6 | D3-C0135 | 0.5908 | 0.35 | 0 | Mr. Franklin watched his boy in the candle-trade closely, to see whether his dislike for i… |
| 7 | D4-C0104 | 0.6075 | 0.217 | 9.411 | Upon Franklin's arrival at New York, Collins, the playmate of his childhood, was one of th… |
| 8 | D6-C0013 | 0.5493 | 0.287 | 8.447 | But swimming and boyish play formed a small, though it may be important, part of his educa… |

**Answer (each sentence checked):**

- From early childhood, Benjamin Franklin was celebrated for his physical beauty, athletic vigor, and imperturbable good nature, and was recognized by his companions as their natural leader. [D4-C0026]
- He was the youngest son in a poor family of seventeen children, and at ten years old he was taken from school to work under his father. [D5-C0010, D3-C0135]
- He was passionately fond of reading from childhood and spent all his savings on books. [D6-C0013]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: What was Benjamin Franklin's childhood like?

Source snippets:
[D4-C0026] (from 04-benjamin-franklin-abbott-1876.txt)
From early childhood Franklin was celebrated for his physical beauty, his athletic vigor and his imperturbable good nature. His companions invariably recognized him as their natural leader. He was in no respect what would be called a religious boy, but in many things he had a high sense of honor.

[D6-C0009] (from 06-benjamin-franklin-more-1900.txt)
When ten years old the lad was taken from school and set to work under his father. But his education was by no means ended. There is a temptation to dwell on these early formative years because he himself was so fond of deducing lessons from the little occurrences of his boyhood; nor do I know any life that shows a more consistent development from beginning to end. There is, too, a peculiar charm in hearing the world-famous philosopher discourse on these petty happenings of childhood and draw from them his wise experience of life. So, for instance, at sixty-six years of age he writes to a friend in Paris the story of "The Whistle." One day when he was seven years old his pocket was filled with coppers, and he immediately started for the shop to buy toys. On the way he met a boy with a whistle, and was so charmed with the sound of it that he gave all his money for one.

[D5-C0010] (from 05-life-of-franklin-goodrich.txt)
LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D3-C0060] (from 03-boyhood-to-manhood-thayer.txt)
Benjamin was more than a comely child; he was handsome. From babyhood to manhood he was so fine-looking as to attract the attention of strangers. His eye beamed with so much intelligence as to almost compel the thought, "There are great talents behind them." Mr. Parton says: "It is probable that Benjamin Franklin derived from his mother the fashion of his body and the cast of his countenance. There are lineal descendants of Peter Folger who strikingly resemble Franklin in these particulars; one of whom, a banker in New Orleans, looks like a portrait of Franklin stepped out of its frame."

[D3-C0049] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin spoke out of the depths of his soul. He was a true Christian man, and took the Christian view of a child, as he did of any thing else. While some men are annoyed by the multiplicity of children, he found a source of comfort and contentment in the possession. The seventeenth child, which number he had, he hailed with the same grateful recognition of God's providence that he did when the first was born. Yet he was poor, and found himself face to face with poverty most of the time. Each child born was born to an inheritance of want. But to him children were God's gift as really as sunshine or showers, day or night, the seventeenth just as much so as the first. This fact alone marks Josiah Franklin as an uncommon man for his day or ours. "If more men and women were of your opinion," continued the relative, "there would be much more enjoyment and peace in all communities. The most favorable view that a multitude of parents indulge is, that children are troublesome comforts."

[D3-C0135] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin watched his boy in the candle-trade closely, to see whether his dislike for it increased or diminished. His anxiety for him was great. He did not wish to compel him to make candles against an increasing desire to escape from the hardship. He had great sympathy for him, too, in his disappointment at leaving school. And it was a hard lot for such a lover of school and study to give them up forever at ten years of age. No more school after that! Small opportunity, indeed, in comparison with those enjoyed by nearly every boy at the present day! Now they are just beginning to learn at this early age. From ten they can look forward to six, eight, or ten years in school and college.

[D4-C0104] (from 04-benjamin-franklin-abbott-1876.txt)
Upon Franklin's arrival at New York, Collins, the playmate of his childhood, was one of the first to meet him. In his earlier days he had been sober, industrious, and was highly esteemed for his mental powers and attainments. But he had become intemperate and a gambler, and was every day intoxicated. Reduced almost to beggary, Franklin felt compelled to furnish him with money to save him from starvation. Penniless he had come on board the boat at New York, and Franklin paid his passage to Philadelphia. William Burnett was then Governor of New York. He was very fond of books and had collected a large library. Franklin also had the same taste and had a large number of books which he was conveying to Philadelphia. The captain informed the Governor that he had a young man on board fond of books, and of superior literary attainments. The Governor begged the captain to bring young Franklin to see him.

[D6-C0013] (from 06-benjamin-franklin-more-1900.txt)
But swimming and boyish play formed a small, though it may be important, part of his education. He was from childhood up "passionately fond of reading," and he was moreover a wise reader, which is still better. Books were not so easy to get in those days; and the good libraries of the country were composed chiefly of great theological volumes in folio on the shelves of the clergymen's studies. But in one way and another Franklin contrived to lay hands on the food he most needed. All the money he could save he devoted to buying books, and he even had recourse to unusual methods of saving for this purpose. When sixteen he chanced to read a treatise commending a vegetable diet, and forthwith he put himself under this regimen, finding he could thus set aside half his board money to increase his library. He also made the acquaintance of the booksellers' apprentices from whom he could borrow books; and often he would read late into the night so as to return the purloined volume early the next morning.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "From early childhood, Benjamin Franklin was celebrated for his physical beauty, athletic vigor, and imperturbable good nature, and was recognized by his companions as their natural leader.",
      "chunk_ids": [
        "D4-C0026"
      ]
    },
    {
      "text": "He was the youngest son in a poor family of seventeen children, and at ten years old he was taken from school to work under his father.",
      "chunk_ids": [
        "D5-C0010",
        "D3-C0135"
      ]
    },
    {
      "text": "He was passionately fond of reading from childhood and spent all his savings on books.",
      "chunk_ids": [
        "D6-C0013"
      ]
    }
  ]
}
```
</details>

### Q4. Who were Benjamin Franklin's siblings?

**Status:** answered

**Search phrasings:** “Who were Benjamin Franklin's siblings?” · “Benjamin Franklin's brothers and sisters” · “the youngest son, the eldest brother, a sister of Benjamin Franklin”

**Retrieval gate:** best cosine 0.6746 (min 0.3), best BM25 15.178 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0178 | 0.6298 | 0.3349 | 10.399 | Mr. Franklin added more to the last remarks, in order to remove an objection which Benjami… |
| 2 | D2-C0270 | 0.6303 | 0.3481 | 11.754 | Franklin had a younger sister, Jane, a pretty girl, afterwards Mrs. Mecom, of whom he was … |
| 3 | D5-C0010 | 0.6746 | 0.3896 | 14.942 | LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Tr… |
| 4 | D3-C0819 | 0.6126 | 0.3206 | 15.178 | "That is all blotted out now," continued James, "I have one request to make, and, if you c… |
| 5 | D3-C0533 | 0.5465 | 0.3485 | 10.965 | "Got brothers and sisters?" "Plenty of them. I am the fifteenth child, and have two sister… |
| 6 | D3-C0585 | 0.5884 | 0.3427 | 7.334 | "Well, you are brothers," interrupted his father, "and you should act as brothers toward e… |
| 7 | D1-C0000 (nav) | 0.6462 | 0.3114 | 13.906 | The Autobiography of Benjamin Franklin by Benjamin Franklin (Harvard Classics edition, ed.… |
| 8 | D1-C0011 | 0.5014 | 0.3029 | 10.607 | The notes one of my uncles (who had the same kind of curiosity in collecting family anecdo… |

**Answer (each sentence checked):**

- Benjamin Franklin had a younger sister named Jane, later Mrs. Mecom. [D2-C0270]
- He also had an older brother named James Franklin, who was a printer. [D1-C0000, D3-C0178]
- He came from a large family of seventeen children, with other brothers and sisters whose specific names are not all individually listed. [D3-C0533, D5-C0010]

_Missing from the sources (per the model): The specific names of all seventeen siblings are not mentioned in the sources._

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Who were Benjamin Franklin's siblings?

Source snippets:
[D3-C0178] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin added more to the last remarks, in order to remove an objection which Benjamin seemed to have to being bound to his brother; and he was successful. The last objection was removed, and cheerfully and gladly Benjamin consented to become a printer-boy. The following was the form of the indenture of apprenticeship that bound Benjamin to his brother for nine years: "This indenture witnesseth that Benjamin Franklin, son of Josiah Franklin, and of Abiah, his wife, of Boston, in the colony of Massachusetts Bay, with the consent of his parents, doth put himself apprentice to his brother, James Franklin, printer, to learn his art, and with him after the manner of an apprentice from the ---- day of ----, in the year of our Lord, 1718, until he shall have fully completed the twenty-first year of his age. During which term the said apprentice his master faithfully shall or will serve, his secrets keep, his lawful commands everywhere gladly do.

[D2-C0270] (from 02-true-benjamin-franklin-fisher-1899.txt)
Franklin had a younger sister, Jane, a pretty girl, afterwards Mrs. Mecom, of whom he was very fond, and he kept up a correspondence with her all his life, sending presents to her at Boston, helping her son to earn a livelihood, and giving her assistance in her old age. Their letters to each other were most homely and loving, and she took the greatest pride in his increasing fame. His correspondence with his parents was also pleasant and familiar. In one of his letters to his mother he amuses her by accounts of her grandchildren, and at the same time pays a compliment to his sister Jane.

[D5-C0010] (from 05-life-of-franklin-goodrich.txt)
LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D3-C0819] (from 03-boyhood-to-manhood-thayer.txt)
"That is all blotted out now," continued James, "I have one request to make, and, if you can grant it, I shall be very happy." "What is it?" "My son is now ten years old, and the loss of his father will, indeed, be a great loss to him. I had intended to instruct him in my trade; and, after my death, I want you should take him to your home in Philadelphia, where he can learn the printer's trade, and, when he understands the business well, return him to his mother and sisters, who will continue the printing house here." "With all my heart I will do it; and I am glad to grant this favor, not only for your sake, but for my own," responded Benjamin. "He shall be one of my family, and I will be to him as a father, and he shall be to me as a son." Thus, at the grave's side, the two brothers were thoroughly reconciled to each other, and it was not long before Franklin had James' son in his own family.

[D3-C0533] (from 03-boyhood-to-manhood-thayer.txt)
"Got brothers and sisters?" "Plenty of them. I am the fifteenth child, and have two sisters younger than I am; only one of the whole number is dead." "You surprise me; yours must have been the largest family in Boston," continued Mr. Read. "I am sure we have no family as large as that in Philadelphia. Your father ought to be worth some money to provide for such a family." "He is not, he is a poor man; so poor that he kept me in school less than two years. I went into the shop to work with him when I was ten years old, and have not been to school since. All my brothers were apprenticed at ten or twelve years of age. I was a printer's apprentice at twelve years of age." "And what was your father's business, if I may be permitted to ask? Your story is a very interesting one, and I want to know more about it."

[D3-C0585] (from 03-boyhood-to-manhood-thayer.txt)
"Well, you are brothers," interrupted his father, "and you should act as brothers toward each other. It has a bad look for one brother to be resentful toward another." "And it not only has the _look_" added his mother, "but it is a most wicked state of heart to cherish. You will never prosper, James, so long as you treat your brother so; and you never ought to prosper." Mrs. Franklin spoke with great plainness. She had never justified James at all in his treatment of Benjamin; and now that the former was adding injury to injury by falsely accusing the latter, she could not suppress her feelings. She magnified the severity of her words, by quoting: "Whosoever is angry with his brother without a cause shall be in danger of the judgment."

[D1-C0000] (from 01-autobiography-franklin.txt)
The Autobiography of Benjamin Franklin by Benjamin Franklin (Harvard Classics edition, ed. Charles W. Eliot) (Project Gutenberg, public domain) THE AUTOBIOGRAPHY OF BENJAMIN FRANKLIN The Harvard Classics WITH INTRODUCTION AND NOTES EDITED BY CHARLES W ELLIOT LLD P F COLLIER & SON COMPANY NEW YORK 1909 Navigation Letter from Mr. Abel James. Publishes the first number of "Poor Richard's Almanac. Proposes a Plan of Union for the colonies Chief events in Franklin's life. INTRODUCTORY NOTE Benjamin Franklin was born in Milk Street, Boston, on January 6, 1706. His father, Josiah Franklin, was a tallow chandler who married twice, and of his seventeen children Benjamin was the youngest son. His schooling ended at ten, and at twelve he was bound apprentice to his brother James, a printer, who published the "New England Courant." To this journal he became a contributor, and later was for a time its nominal editor.

[D1-C0011] (from 01-autobiography-franklin.txt)
The notes one of my uncles (who had the same kind of curiosity in collecting family anecdotes) once put into my hands, furnished me with several particulars relating to our ancestors. From these notes I learned that the family had lived in the same village, Ecton, in Northamptonshire, for three hundred years, and how much longer he knew not (perhaps from the time when the name of Franklin, that before was the name of an order of people, was assumed by them as a surname when others took surnames all over the kingdom), on a freehold of about thirty acres, aided by the smith's business, which had continued in the family till his time, the eldest son being always bred to that business; a custom which he and my father followed as to their eldest sons. When I searched the registers at Ecton, I found an account of their births, marriages and burials from the year 1555 only, there being no registers kept in that parish at any time preceding.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin had a younger sister named Jane, later Mrs. Mecom.",
      "chunk_ids": [
        "D2-C0270"
      ]
    },
    {
      "text": "He also had an older brother named James Franklin, who was a printer.",
      "chunk_ids": [
        "D1-C0000",
        "D3-C0178"
      ]
    },
    {
      "text": "He came from a large family of seventeen children, with other brothers and sisters whose specific names are not all individually listed.",
      "chunk_ids": [
        "D3-C0533",
        "D5-C0010"
      ]
    }
  ],
  "missing": "The specific names of all seventeen siblings are not mentioned in the sources."
}
```
</details>

### Q5. What schooling or training did Benjamin Franklin have?

**Status:** answered

**Search phrasings:** “What schooling or training did Benjamin Franklin have?” · “Benjamin Franklin was sent to school, education and learning to read and write” · “Benjamin Franklin was apprenticed and trained, studied books, teachers and college”

**Retrieval gate:** best cosine 0.7323 (min 0.3), best BM25 17.6 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D6-C0008 | 0.6329 | 0.39 | 17.6 | Naturally in so large a family, where the means of support were so slender, young Benjamin… |
| 2 | D3-C0107 | 0.6681 | 0.3788 | 9.211 | "You will not take him out of school until John leaves, will you?" inquired Mrs. Franklin.… |
| 3 | D4-C0028 | 0.6726 | 0.4191 | 14.706 | At the age of eight years, Benjamin entered the Boston Grammar School. His progress was ve… |
| 4 | D3-C0066 | 0.6187 | 0.3347 | 13.02 | III. PAYING TOO DEAR FOR THE WHISTLE. When Benjamin was seven years old he had not been to… |
| 5 | D5-C0010 | 0.7323 | 0.4361 | 12.709 | LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Tr… |
| 6 | D3-C0098 | 0.6305 | 0.2924 | 11.615 | From his first day's attendance at school Benjamin gave promise of high scholarship. He we… |
| 7 | D3-C0299 | 0.5728 | 0.3021 | 10.348 | Examples of industry, enterprise, despatch, promptness, punctuality, and circumspection ar… |
| 8 | D3-C0099 | 0.568 | 0.3211 | 10.335 | "You will give him an education, I suppose?" said Mr. Williams, inquiringly. "Such a boy o… |

**Answer (each sentence checked):**

- At the age of eight, Benjamin Franklin was sent to the grammar school, where he stayed for less than a year. [D6-C0008, D4-C0028]
- He also studied under Mr. George Brownell, who taught penmanship and arithmetic. [D6-C0008, D3-C0107]
- His formal school life was completed at the age of ten when he was taken into his father's shop. [D4-C0028]
- Later, working in a printing office served as a school where he laid the foundation of his learning and fame. [D3-C0299]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: What schooling or training did Benjamin Franklin have?

Source snippets:
[D6-C0008] (from 06-benjamin-franklin-more-1900.txt)
Naturally in so large a family, where the means of support were so slender, young Benjamin had to get most of his education outside of the schoolroom, and something of this practical unscholastic training clung to his mind always. Perhaps this was just as well in that age and place, where theology and education were synonymous terms. Certainly his consequent lack of deep root in the past and his impressionability, though limitations to his genius, make him the more typical of American intelligence. At the age of eight he was sent to the grammar school, where he remained less than a year, and then passed under the charge of Mr. George Brownell, a teacher of the three R's. Benjamin had learned to read so young that he himself could not remember being unable to read, and at school he did notably well. It is curious, however, that he found difficulty with his arithmetic, and was never a mathematician, though later in life he became skillful in dealing with figures. No error could be greater than Carlyle's statement that ability in mathematics is a test of intelligence. Goethe, scientist as well as poet, could never learn algebra; and Faraday, the creator of electrical science, knew no mathematics at all.

[D3-C0107] (from 03-boyhood-to-manhood-thayer.txt)
"You will not take him out of school until John leaves, will you?" inquired Mrs. Franklin. "I shall have him leave the public school at the close of this term, and that will give him a full year's schooling. And then I shall put him into Mr. Brownwell's school for a while to improve him in penmanship and arithmetic. By that time I must have him in the factory." Mr. Brownwell had a private school, in which he taught penmanship and arithmetic. It was quite a famous school, made so by his success as a teacher in these departments. Benjamin had received no intimation, at this time, that he would be taken out of school. His father shrunk from disclosing his final plan to him because he knew it would be so disappointing. But as the close of the school year drew near, he was obliged to open the subject to him. It was an unpleasant revelation to Benjamin, although it was not altogether unexpected. For, in the outset, his father had said that such might be the necessity.

[D4-C0028] (from 04-benjamin-franklin-abbott-1876.txt)
At the age of eight years, Benjamin entered the Boston Grammar School. His progress was very rapid, and at the close of the year he was at the head of his class. The father had hoped to give his promising boy a liberal education; but his large family and straitened circumstances rendered it necessary for him to abandon the plan. At the age of ten years his school life was completed, and he was taken into his father's shop to run of errands, and to attend to the details of candle-making, cutting wicks, filling moulds, and waiting upon customers. He could write a good hand, could read fluently, could express himself with ease on paper, but in all arithmetical studies was very backward.

[D3-C0066] (from 03-boyhood-to-manhood-thayer.txt)
III. PAYING TOO DEAR FOR THE WHISTLE. When Benjamin was seven years old he had not been to school a day. Yet he was a good reader and speller. In manhood he said: "I do not remember when I could not read, so it must have been very early." He was one of those irrepressible little fellows, whose intuition and observation are better than school. He learned more out of school than he could or would have done in it. His precocity put him in advance of most boys at seven, even without schooling. It was not necessary for him to have school-teachers to testify that he possessed ten talents,--his parents knew that, and every one else who was familiar with him.

[D5-C0010] (from 05-life-of-franklin-goodrich.txt)
LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D3-C0098] (from 03-boyhood-to-manhood-thayer.txt)
From his first day's attendance at school Benjamin gave promise of high scholarship. He went to work with a will, improving every moment, surmounting every difficulty, and enjoying every opportunity with a keen relish. Mr. Williams was both gratified and surprised. That a lad so young should take hold of school lessons with so much intelligence and tact, and master them so easily, was a surprise to him, and he so expressed himself to Mr. Franklin. "Your son is a remarkable scholar for one so young. I am more than gratified with his industry and progress. His love of knowledge is almost passionate." "Yes, he was always so," responded Mr. Franklin. "He surprised us by reading well before we ever dreamed of such a thing. He taught himself, and a book has always been of more value to him than any thing else." "You will give him an education, I suppose?" said Mr. Williams, inquiringly. "Such a boy ought to have the chance."

[D3-C0299] (from 03-boyhood-to-manhood-thayer.txt)
Examples of industry, enterprise, despatch, promptness, punctuality, and circumspection are inspiring to both old and young; and nowhere do these noble qualities appear to better advantage than they do where busy brains and hands make the newspaper in the printing office. It is a remarkably useful school. It was so when Benjamin was a boy. It was a far better school for him than that of Williams or Brownwell. Here he laid the foundation of his learning and fame. The same was true of Horace Greeley, who founded the _New York Tribune_, and of Henry J. Raymond, who made the _Times_ what it is. The late Vice-President Schuyler Colfax was schooled in a printing office for his honorable public career; and the same was true of other distinguished statesmen. But none of these examples are so remarkable as the following, that was made possible by Benjamin Franklin's example.

[D3-C0099] (from 03-boyhood-to-manhood-thayer.txt)
"You will give him an education, I suppose?" said Mr. Williams, inquiringly. "Such a boy ought to have the chance." "My desire to do it is strong, much stronger than my ability to pay the bills. It is not certain that I shall be able to continue him long at school, though I shall do it if possible." "Such love of knowledge as he possesses ought to be gratified," continued Mr. Williams. "He excels by far any scholar of his age in school. He will lead the whole school within a short time. His enthusiasm is really remarkable." Within a few months, as the teacher predicts, Benjamin led the school. He was at the head of his class in every study except arithmetic. Nor did he remain at the head of his class long, for he was rapidly promoted to higher classes. He so far outstripped his companions that the teacher was obliged to advance him thus, that his mental progress might not be retarded.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "At the age of eight, Benjamin Franklin was sent to the grammar school, where he stayed for less than a year.",
      "chunk_ids": [
        "D6-C0008",
        "D4-C0028"
      ]
    },
    {
      "text": "He also studied under Mr. George Brownell, who taught penmanship and arithmetic.",
      "chunk_ids": [
        "D6-C0008",
        "D3-C0107"
      ]
    },
    {
      "text": "His formal school life was completed at the age of ten when he was taken into his father's shop.",
      "chunk_ids": [
        "D4-C0028"
      ]
    },
    {
      "text": "Later, working in a printing office served as a school where he laid the foundation of his learning and fame.",
      "chunk_ids": [
        "D3-C0299"
      ]
    }
  ]
}
```
</details>

### Q6. What was Benjamin Franklin's first job?

**Status:** answered

**Search phrasings:** “What was Benjamin Franklin's first job?” · “Benjamin Franklin first began to work, first employment and wages” · “Benjamin Franklin was put to work in a trade, the first job”

**Retrieval gate:** best cosine 0.6475 (min 0.3), best BM25 14.03 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0037 | 0.6475 | 0.3678 | 9.941 | We have mentioned that Franklin was one of a large family of children. By the two marriage… |
| 2 | D4-C0177 | 0.5825 | 0.2801 | 10.281 | Just as they got ready for work, quite to their delight, a countryman came in introduced b… |
| 3 | D3-C0775 | 0.5835 | 0.2811 | 14.03 | In the morning Benjamin put in his appearance at Keimer's office, ready for work. He recei… |
| 4 | D3-C0777 | 0.4952 | 0.2717 | 10.477 | "That is the only way any person ever reached an honorable position," remarked Benjamin, a… |
| 5 | D3-C0153 | 0.641 | 0.3525 | 8.976 | Mr. Franklin lost no time in securing a place in Samuel's shop. Both parties agreed that i… |
| 6 | D3-C0174 | 0.5583 | 0.2785 | 8.946 | Mr. Franklin lost no time in conferring with James, who favored the plan without any reser… |
| 7 | D2-C0414 | 0.5898 | 0.2882 | 0 | In the same spirit Franklin secured by a little agitation the paving of the street round t… |
| 8 | D4-C0036 | 0.5171 | 0.2689 | 12.814 | The judicious father, apprehensive that his son might be lured secretly to embark for some… |

**Answer (each sentence checked):**

- Benjamin Franklin selected the employment of a cutler as a trade and entered upon the business for a few days, but the trade was given up because his father was unable to settle the terms of indenture. [D4-C0036]
- He also spent a brief period in Samuel's shop learning the cutler trade, which was different from candle-making. [D3-C0153]
- It was later decided to bind Benjamin as an apprentice to his brother James to learn the trade of a printer. [D4-C0037, D3-C0174]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: What was Benjamin Franklin's first job?

Source snippets:
[D4-C0037] (from 04-benjamin-franklin-abbott-1876.txt)
We have mentioned that Franklin was one of a large family of children. By the two marriages of his father, there were sixteen sons and daughters around the family hearth. One of the sons, James, had been sent to London to learn the trade of a printer. He returned to Boston and set up business on his own account, when Benjamin was eleven years of age. It was decided to bind Benjamin to this business. Reluctantly Benjamin consented to place himself in such subordination to his brother. He was, however, bound to him for a period of nine years, from twelve to twenty-one. During the last year he was to receive a journeyman's wages. The following extract from this form of indenture of apprenticeship, which was in common use in the reign of George the First, will be read with interest.

[D4-C0177] (from 04-benjamin-franklin-abbott-1876.txt)
Just as they got ready for work, quite to their delight, a countryman came in introduced by one of the Junto, George House, who wanted a five shilling job executed. "This man's five shillings," writes Franklin, "being our first fruits, and coming so seasonably, gave me more pleasure than any crown I have since earned. And from the gratitude I felt toward House, has made me often more ready, than perhaps I otherwise should have been, to assist young beginners." The two young men devoted themselves to their work, with assiduity which was a sure precursor of success. Often Franklin was found diligently employed until eleven o'clock at night. His industry and energy soon attracted attention. A gentleman living near the office said to some of his friends: "The industry of that Franklin is superior to anything I ever saw of the kind. I see him still at work when I go home from the club, and he is at work again before his neighbors are out of bed."

[D3-C0775] (from 03-boyhood-to-manhood-thayer.txt)
In the morning Benjamin put in his appearance at Keimer's office, ready for work. He received a hearty welcome, and was at once apprized of the paper-money job of New Jersey. Benjamin succeeded in contriving and completing a copper-plate press; and when cuts and ornaments were all ready, Keimer and he proceeded to Burlington, N.J., where they remained three months to fulfill the contract. It proved a rare school for Benjamin. It brought him in contact with many prominent men, who were of much assistance to him afterwards. He was so much more intelligent than Keimer, that the latter was of little consequence, as very little notice was taken of him. One day Isaac Decon, the surveyor-general, said to him: "You are complete master of your business, and success is before you." "I have improved my opportunities," modestly answered Benjamin, "and done the best I could to learn my trade. I don't like the half-way method of doing business."

[D3-C0777] (from 03-boyhood-to-manhood-thayer.txt)
"That is the only way any person ever reached an honorable position," remarked Benjamin, after listening to the interesting story of success. "You are right in that view, and one-half of the battle is fought when correct views of life are fixed. When an employer like Keimer is inferior to his employee in ability, tact, and enterprise, there is a very poor show for him. If you set up for yourself in Philadelphia, you will work him completely out of his business." Late in the spring of 1728 the printing outfit arrived from England. Benjamin and Meredith had settled with Keimer, who was unusually happy because his profits on his paper-money job in New Jersey had tided him over very discouraging embarrassments. Keimer knew nothing of their plans, however, when a settlement was consummated, as both had kept the secret. The first intimation that he, or the public, had of such an enterprise, was the opening of their printing house in the lower part of Market Street--"FRANKLIN & MEREDITH."

[D3-C0153] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin lost no time in securing a place in Samuel's shop. Both parties agreed that it would be best for Benjamin to spend a brief period in the business before settling the terms of apprenticeship. Accordingly he entered upon his new trade immediately, and was much pleased with it. It was so different from the work of candle-making, and required so much more thought and ingenuity, that he enjoyed it. He went to each day's work with a light and cheerful heart. He was soon another boy in appearance, contented, happy, and hopeful. Samuel recognized his ingenuity and willingness to work, and prophesied that he would become an expert cutler. He was ready to receive him as an apprentice, and Benjamin was willing to be bound to him until he was twenty-one years of age.

[D3-C0174] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin lost no time in conferring with James, who favored the plan without any reserve. He proposed to take Benjamin as an apprentice, to serve until he was twenty-one years old, according to the custom of the times, receiving twenty pounds for the same, and giving him board and clothes until the last year, when he would be paid journeyman's wages. This was a good opportunity on the whole, for printing was in its infancy in our country at that time. Not more than six or eight persons had been in the business in Boston before James Franklin commenced, in the year 1717. The demand for printing must have been very small indeed. The first printing press in the United States was set up in Cambridge in 1639 by Rev. Jesse Glover, who gave it to Harvard University. The first thing printed was the "Freeman's oath"; the next, the almanac for New England, calculated by William Pierce, a mariner; the next, a metrical version of the Psalms.

[D2-C0414] (from 02-true-benjamin-franklin-fisher-1899.txt)
In the same spirit Franklin secured by a little agitation the paving of the street round the market, and afterwards started subscriptions to keep this pavement clean. At that time the streets of Philadelphia, like those of most of the colonial towns, were merely earth roads, and it was not until some years after Franklin’s first efforts at the market that there was any general paving done. He also secured a well-regulated night watch for the city in place of the disorderly, drunken heelers of the constables, who had long made a farce of the duty; and he established a volunteer fire company which was the foundation of the system that prevailed in Philadelphia until the paid department was introduced after the civil war.

[D4-C0036] (from 04-benjamin-franklin-abbott-1876.txt)
The judicious father, apprehensive that his son might be lured secretly to embark for some distant voyage, visited with his son all the varied workshops of Boston, that he might select that trade which to him would seem most desirable. Benjamin examined all these workshops with intensest interest. He selected the employment of a cutler, and entered upon the business for a few days; but at that time a boy who was about to learn a trade was apprenticed to a master. As a premium for learning the business he usually had to pay about one hundred dollars. Then after a series of years, during which he worked for nothing, he was entitled for a time to receive journeyman's wages. But his father, Josiah Franklin, was unable to settle satisfactorily the terms of indenture, and the cutlery trade was given up.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin selected the employment of a cutler as a trade and entered upon the business for a few days, but the trade was given up because his father was unable to settle the terms of indenture.",
      "chunk_ids": [
        "D4-C0036"
      ]
    },
    {
      "text": "He also spent a brief period in Samuel's shop learning the cutler trade, which was different from candle-making.",
      "chunk_ids": [
        "D3-C0153"
      ]
    },
    {
      "text": "It was later decided to bind Benjamin as an apprentice to his brother James to learn the trade of a printer.",
      "chunk_ids": [
        "D4-C0037",
        "D3-C0174"
      ]
    }
  ]
}
```
</details>

### Q7. An adventurous story from Benjamin Franklin's life.

**Status:** answered

**Search phrasings:** “An adventurous story from Benjamin Franklin's life.” · “Benjamin Franklin set out on an adventurous journey alone” · “Benjamin Franklin ran away, a voyage by boat, travelled on foot, an exciting adventure”

**Retrieval gate:** best cosine 0.6847 (min 0.3), best BM25 14.03 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0077 | 0.6847 | 0.434 | 9.2 | It was late in the afternoon when they reached the port. For thirty hours they had been wi… |
| 2 | D3-C0227 | 0.5071 | 0.2712 | 6.964 | "The motion is very pleasant indeed, and I could swim all day without becoming fatigued. B… |
| 3 | D5-C0039 | 0.6381 | 0.3572 | 9.286 | 2. In the evening, Franklin found himself feverish, and went to bed. As he drank plentiful… |
| 4 | D3-C0142 | 0.5614 | 0.2454 | 8.959 | "Uncle Benjamin," of course, could not tolerate the idea of his nephew becoming a sailor. … |
| 5 | D2-C0634 | 0.3354 | 0.0002 | 7.238 | In April, 1778, a few months after the signing of the treaty, John Adams, after a most dan… |
| 6 | D6-C0065 | 0.4249 | 0.028 | 9.09 | With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the sa… |
| 7 | D6-C0027 | 0.4449 | 0.1421 | 14.03 | II BEGINNINGS IN PHILADELPHIA AND FIRST VOYAGE TO ENGLAND The only printer then in New Yor… |
| 8 | D4-C0035 | 0.5152 | 0.1992 | 10.305 | "The Boston manner, the turn of phrase, and even tone of voice and accent in pronunciation… |

**Answer (each sentence checked):**

- In 1723, Benjamin Franklin experienced a perilous and adventurous journey from New York to Philadelphia that involved traveling without food or water for thirty hours, enduring a violent rain, and trudging on foot through a wilderness. [D4-C0077, D5-C0039, D6-C0027]
- During this journey, he was soaked and tired, had a slender purse, and was even suspected of being a runaway servant. [D4-C0077, D5-C0039]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: An adventurous story from Benjamin Franklin's life.

Source snippets:
[D4-C0077] (from 04-benjamin-franklin-abbott-1876.txt)
It was late in the afternoon when they reached the port. For thirty hours they had been without food or water. Such were the perils of a passage from New York to Philadelphia in the year 1723. Franklin, in the enjoyment of magnificent health, slept quietly that night in an humble inn, and awoke in the morning with all his accustomed vigor. There were still fifty miles of land travel before him, ere he could cross the forest covered plains of New Jersey to Burlington, on the banks of the Delaware, which were seventeen miles above Philadelphia. There was neither railroad, stage-coach nor cart to convey him through the wilderness. Indeed it was thirty-three years after this before the first line of stages across New Jersey was established. There was a rude path, probably following an ancient Indian trail, along which our solitary adventurer trudged on foot. It rained; but still Benjamin found it necessary, having so slender a purse, to press on regardless of discomfort.

[D3-C0227] (from 03-boyhood-to-manhood-thayer.txt)
"The motion is very pleasant indeed, and I could swim all day without becoming fatigued. But there is no skill in it, as you say." Benjamin expressed no opinion as to the adoption of the method by others, and the boys separated to tell the story of Benjamin's exploits on the water over town. Many years afterwards, when Benjamin was a public man, famous in his own country and Europe, he wrote to a Frenchman by the name of Dubourg, of both of these experiments as follows:

[D5-C0039] (from 05-life-of-franklin-goodrich.txt)
2. In the evening, Franklin found himself feverish, and went to bed. As he drank plentifully of cold water, his fever left him, and in the morning he proceeded on his journey. After crossing the ferry, he travelled on foot, notwithstanding a violent rain, till noon. Being now thoroughly soaked and tired, he stopped at a poor inn, where he spent the remainder of the day, and all night. 3. He now began to wish that he had never left home. His prospect of procuring employment, even when he should arrive at Philadelphia, was uncertain. He thought of the distress his sudden disappearance must have occasioned to his parents. Besides all this, he made such a sorry figure that he was suspected of being a runaway servant, and in danger of being taken up on that suspicion.

[D3-C0142] (from 03-boyhood-to-manhood-thayer.txt)
"Uncle Benjamin," of course, could not tolerate the idea of his nephew becoming a sailor. With his poor opinion of the candle-trade, he would have him pursue the business all his life rather than become a sailor. "Do any thing rather than follow the seas," he said. "If you want to throw yourself away, body and soul, go before the mast. But if you want to be somebody, and do something that will make you respectable and honored among men, never ship for a voyage, long or short. A boy of one talent can be a cabin-boy, but a boy of ten talents ought to be above that business, and find his place on a higher plane of life." VII. CHOOSING A TRADE AND STEALING SPORT. Mr. and Mrs. Franklin canvassed the subject thoroughly, and wisely decided that Benjamin might engage in some other pursuit. "To be successful a man must love his calling," remarked Mr. Franklin, "and Benjamin hates his. He appears to go to each day's work with a dread, and as long as he feels so he will not accomplish any thing."

[D2-C0634] (from 02-true-benjamin-franklin-fisher-1899.txt)
In April, 1778, a few months after the signing of the treaty, John Adams, after a most dangerous and adventurous voyage across the Atlantic, arrived to take the place of Silas Deane. He has left us a very full account of the condition of affairs and his efforts at reform. Franklin’s biographers have been sorely puzzled to know what to do with these criticisms; but any one who will take the trouble to read impartially all that Adams has said, and not merely extracts from it, will easily be convinced of his fairness. He makes no mistake about Lee; speaks of him as a man very difficult to get on with, and describes Izard in the same way. There is not the slightest evidence that these two men poisoned his mind against Franklin. He does not side with them entirely; but, on the contrary, in the changes he undertook to make was sometimes on their side and sometimes against them. He held the scales very evenly.

[D6-C0065] (from 06-benjamin-franklin-more-1900.txt)
With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the same house with him, and now Mrs. Godfrey undertook to make a match between him and the daughter of a relative of hers. Franklin's account of this affair for its coolness and placidity may almost be compared with Gibbon's "I sighed as a lover, I obeyed as a son." On learning that the girl's parents could not or would not give with her enough money to pay off his debts, the gallant suitor at once and irrevocably withdrew. He then looked about him for another match, but found to his chagrin that an adventurous printer could not command an agreeable wife and a dowry at the same time. Being determined to marry, that he might bring order into his life, he at last turned to Miss Read, with whom he had maintained a friendly correspondence, and notwithstanding the difficulties in the way married her on the 1st of September, 1730.

[D6-C0027] (from 06-benjamin-franklin-more-1900.txt)
II BEGINNINGS IN PHILADELPHIA AND FIRST VOYAGE TO ENGLAND The only printer then in New York was old William Bradford, formerly of Philadelphia, whose monument may still be seen in Trinity Churchyard. To Mr. William Bradford accordingly young Franklin applied for work; but there was little printing done in the town and Bradford had no need of another hand at the press. He told Franklin, however, that his son at Philadelphia had lately lost his principal assistant by death, and advised Franklin to go thither. Without delay Franklin set out for that place, and after a somewhat adventurous journey arrived at the Market Street wharf about eight or nine o'clock of a Sunday morning.

[D4-C0035] (from 04-benjamin-franklin-abbott-1876.txt)
"The Boston manner, the turn of phrase, and even tone of voice and accent in pronunciation, all please and seem to revive and refresh me." For two years Benjamin continued to assist his father in the business of soap and candle making. He was continually looking for an opportunity to escape the drudgery of that employment and enter upon some more congenial business. Like most adventurous boys, he thought much of the romance of a sea-life. An elder brother had run away, had gone to sea, and for years had not been heard from. Benjamin's father became very anxious as he witnessed the discontent of his son. This anxiety was increased when an elder brother married, removed to Rhode Island, and set up a soap and candle establishment for himself. This seemed to Benjamin to rivet the chains which bound him at home. Apparently his father could not spare him from the business. Thus he seemed doomed to spend the remainder of his days in employment which proved to him increasingly uncongenial.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "In 1723, Benjamin Franklin experienced a perilous and adventurous journey from New York to Philadelphia that involved traveling without food or water for thirty hours, enduring a violent rain, and trudging on foot through a wilderness.",
      "chunk_ids": [
        "D4-C0077",
        "D5-C0039",
        "D6-C0027"
    ]
    },
    {
      "text": "During this journey, he was soaked and tired, had a slender purse, and was even suspected of being a runaway servant.",
      "chunk_ids": [
        "D4-C0077",
        "D5-C0039"
      ]
    }
  ]
}
```
</details>

### Q8. A scary or dangerous moment Benjamin Franklin faced.

**Status:** answered

**Search phrasings:** “A scary or dangerous moment Benjamin Franklin faced.” · “Benjamin Franklin was in great danger and narrowly escaped” · “a frightening storm, shipwreck, nearly drowned or killed, peril”

**Retrieval gate:** best cosine 0.5996 (min 0.3), best BM25 9.702 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0317 | 0.5138 | 0.2743 | 9.194 | In tracing the disasters of war, it is interesting to observe how many of those disasters … |
| 2 | D1-C0423 | 0.3473 | 0.3998 | 8.934 | We had a watchman plac'd in the bow, to whom they often called, "Look well out before ther… |
| 3 | D2-C0667 | 0.5996 | 0.3095 | 6.019 | He was also from time to time receiving all sorts of proposals of peace from emissaries or… |
| 4 | D3-C0573 | 0.3977 | 0.3786 | 8.888 | "Well, I am used to it; I have encountered as many storms as any body of my age," replied … |
| 5 | D3-C0365 | 0.4211 | 0.202 | 5.884 | XV. THE "COURANT" IN TROUBLE. "The Legislature is calling you to an account," said a custo… |
| 6 | D4-C0076 | 0.4536 | 0.3987 | 9.702 | "He may employ you, as he has recently lost an apprentice by death." Leaving his chest of … |
| 7 | D4-C0275 | 0.5729 | 0.3039 | 0 | "That part of my hand and fingers which held the chain, was left white as though the blood… |
| 8 | D4-C0511 | 0.5679 | 0.271 | 8.639 | Though Franklin was the sweetest tempered of men, he returned to Philadelphia with his spi… |

**Answer (each sentence checked):**

- During a journey, a squall struck Benjamin Franklin's boat, splitting its sail and pitching his fellow passenger overboard, whom Franklin saved by catching him by the hair. [D4-C0076]
- The sudden tempest escalated into a storm that beat upon them all night, leaving them exhausted, drenched, hungry, and in great danger near the shore. [D4-C0076]
- On another occasion, while attempting to give an electrical shock to a paralytic patient, Franklin received the entire charge himself, which knocked him flat and senseless onto the floor. [D4-C0275]

<details><summary>Prompt sent (gemini-3.5-flash-lite)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: A scary or dangerous moment Benjamin Franklin faced.

Source snippets:
[D4-C0317] (from 04-benjamin-franklin-abbott-1876.txt)
In tracing the disasters of war, it is interesting to observe how many of those disasters are owing to unpardonable folly. Some months after Franklin's departure, on a cold, bleak day in November, a large part of the garrison, unmindful of danger, were skating, like school-boys on the Lehigh river. The vigilant Indians saw their opportunity. Like howling wolves they made a rush upon the fort, entered its open gates, and killed or captured all its inmates. The skaters fled into the woods. They were pursued. Some were killed or captured. Some perished miserably of cold and starvation. Probably a few escaped. The triumphant savages, having plundered the fort and the dwellings of all their contents, applied the torch, and again Guadenhutton was reduced to a pile of ashes.

[D1-C0423] (from 01-autobiography-franklin.txt)
We had a watchman plac'd in the bow, to whom they often called, "Look well out before there," and he as often answered, "Ay ay;" but perhaps had his eyes shut, and was half asleep at the time, they sometimes answering, as is said, mechanically; for he did not see a light just before us, which had been hid by the studdingsails from the man at the helm, and from the rest of the watch, but by an accidental yaw of the ship was discover'd, and occasion'd a great alarm, we being very near it, the light appearing to me as big as a cart-wheel. It was midnight, and our captain fast asleep; but Captain Kennedy, jumping upon deck, and seeing the danger, ordered the ship to wear round, all sails standing; an operation dangerous to the masts, but it carried us clear, and we escaped shipwreck, for we were running right upon the rocks on which the light-house was erected. This deliverance impressed me strongly with the utility of light-houses, and made me resolve to encourage the building more of them in America, if I should live to return there.

[D2-C0667] (from 02-true-benjamin-franklin-fisher-1899.txt)
He was also from time to time receiving all sorts of proposals of peace from emissaries or agents of the British government; and he had a long correspondence on this subject with David Hartley, who helped him to arrange the exchange of prisoners in England. Nearly all these proposals contained a trap of some kind, as that we should break our alliance with France and then England would treat with us, or that there should be a peace without a definite recognition of independence; and some of them may have been intended to entrap Franklin himself. It was, in any event, most dangerous and delicate work, for it was corresponding with the public enemy. Most men in Franklin’s position would have been compelled to drop it entirely, for fear of becoming involved in some serious difficulty; for it was suspected, if not actually proved, that persons connected with our own embassy in France were using their official knowledge to speculate in stocks in England. But Franklin came through it all unscathed.

[D3-C0573] (from 03-boyhood-to-manhood-thayer.txt)
"Well, I am used to it; I have encountered as many storms as any body of my age," replied Benjamin figuratively, which the captain did not quite understand. "Then you have followed the sea, have you?" "No; I have followed the land mostly; but there are hard storms on the land, are there not?" "Of course"; and the captain thought only of rain storms and snow storms when he answered. "All I meant was," added Benjamin by way of explanation, "that I have had rather of a rough life so far; have seen a good deal of trouble for one of my years; and have rather got accustomed to rough usage. A storm at sea will only vary the experience a little. I think I can withstand it." "You will have to stand it any way. Not much chance to choose when a storm overtakes us out to sea. If I am any judge of weather, a terrible storm is brewing, and it will be on us in a hurry."

[D3-C0365] (from 03-boyhood-to-manhood-thayer.txt)
XV. THE "COURANT" IN TROUBLE. "The Legislature is calling you to an account," said a customer to James Franklin, as he entered the office. "The officials can't put up with your cutting criticisms." "I am aware of that. I heard that they were going to haul the _Courant_ over the coals; but I do not see what they can do about it." "They can stop your printing it, I suppose. It would be an intolerant act, of course; but governments have never been tolerant towards the press, you know." "The day is coming when they will be," responded James. "A free press is indispensable to human progress. So long as I run the _Courant_ it shall speak plainly of intolerance and hypocrisy of every form. I shall hit the corruption of the times in high places or low." "That is sound doctrine," replied the customer. "I endorse it, but government officials do not. They feel very sore, and will make trouble for you if they can." At that moment Benjamin came rushing into the office under considerable excitement.

[D4-C0076] (from 04-benjamin-franklin-abbott-1876.txt)
"He may employ you, as he has recently lost an apprentice by death." Leaving his chest of clothes to go round by sea to Philadelphia, Benjamin took passage in a small dilapidated shore boat which crept along the coast to Amboy. A drunken Dutchman was his only fellow passenger. The gloom of the primeval forest overshadowed Governor's Island: not a single cabin as yet had been reared in its solitudes. A squall struck the boat, split its sail, and pitched the Dutchman overboard. Franklin caught him by the hair and saved him from drowning. The sudden tempest increased into a storm, and the boat was driven fiercely before the gale. The surf dashed so violently upon the shore that they could not venture to land. Night approached. Exhausted, drenched and hungry, they cast anchor near the Long Island shore, where a bend in the land afforded them slight protection while still they were in great danger. There were one or two log cabins in the vicinity. Several of the men came to the shore, but could afford them no relief. They had no provision on board excepting a single bottle of bad rum. All night long the tempest beat upon them. In the morning the wind had so far lulled that they were enabled to repair their sail, and to work their way on to Amboy.

[D4-C0275] (from 04-benjamin-franklin-abbott-1876.txt)
"That part of my hand and fingers which held the chain, was left white as though the blood had been driven out; and remained so eight or ten minutes after, feeling like dead flesh; and I had numbness in my arms and the back of my neck which continued to the next morning, but wore off." Franklin was much mortified at his awkwardness in this experiment. He declared it to be a notorious blunder, and compared it with the folly of the Irishman, who wishing to steal some gun-powder, bored a hole through the cask with red hot iron. But notwithstanding this warning, not long afterwards, in endeavoring to give a shock to a paralytic patient, he received the whole charge himself, and was knocked flat and senseless on the floor.

[D4-C0511] (from 04-benjamin-franklin-abbott-1876.txt)
Though Franklin was the sweetest tempered of men, he returned to Philadelphia with his spirit greatly embittered against the demoniac foes of his country. For some time no jokes escaped his lips or pen. In December, Arnold, then a patriot and a brave soldier, had made an unsuccessful attack upon Quebec. He had retired to Montreal. Franklin was again appointed one of these commissioners, to visit Arnold and advise respecting Canadian affairs.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "During a journey, a squall struck Benjamin Franklin's boat, splitting its sail and pitching his fellow passenger overboard, whom Franklin saved by catching him by the hair.",
      "chunk_ids": [
        "D4-C0076"
      ]
    },
    {
      "text": "The sudden tempest escalated into a storm that beat upon them all night, leaving them exhausted, drenched, hungry, and in great danger near the shore.",
      "chunk_ids": [
        "D4-C0076"
      ]
    },
    {
      "text": "On another occasion, while attempting to give an electrical shock to a paralytic patient, Franklin received the entire charge himself, which knocked him flat and senseless onto the floor.",
      "chunk_ids": [
        "D4-C0275"
      ]
    }
  ]
}
```
</details>

### Q9. A funny anecdote about Benjamin Franklin.

**Status:** answered

**Search phrasings:** “A funny anecdote about Benjamin Franklin.” · “a funny, humorous anecdote about Benjamin Franklin” · “Benjamin Franklin made people laugh with a joke, a witty remark, an amusing story”

**Retrieval gate:** best cosine 0.7071 (min 0.3), best BM25 14.213 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0562 | 0.6561 | 0.4074 | 10.36 | "No," said I laughing, "because Mr. Franklin has no----" I was going to say what I did not… |
| 2 | D4-C0481 | 0.6392 | 0.3046 | 12.71 | Franklin immediately commenced packing his trunks. Astonishing, almost incredible as it ma… |
| 3 | D6-C0128 | 0.4085 | 0.323 | 12.829 | Whitehead, who is very shrewd, soon after began to smoke it, and looking in my face, said,… |
| 4 | D4-C0495 | 0.7071 | 0.4984 | 8.364 | [Footnote 25: "And here perhaps we have one of the reasons why Dr. Franklin, who was unive… |
| 5 | D2-C0031 | 0.6292 | 0.4338 | 14.213 | He seems to have been totally without either irritability or excitability. In this he was … |
| 6 | D4-C0506 | 0.6198 | 0.2713 | 6.784 | Washington was assembling quite an army of American troops around Boston, holding the foe … |
| 7 | D3-C0609 | 0.6203 | 0.3363 | 0 | Benjamin was taken by surprise, and scarcely knew what to say. Rallying himself, however, … |
| 8 | D2-C0165 | 0.4161 | 0.2527 | 11.46 | “In old Time it was no disrespect for Men and Women to be called by their own Names: _Adam… |

**Answer (each sentence checked):**

- Franklin was known for his strong sense of humor, making witty speeches, writing amusing articles, and telling jokes that helped restore good humor and relieve tension in Congress. [D4-C0481, D4-C0495, D2-C0031]
- One characteristic joke in Congress occurred when he used a witticism to quench an injudicious movement urging the Episcopal clergy to refrain from praying for the king. [D4-C0495]

<details><summary>Prompt sent (gemini-3.5-flash-lite)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: A funny anecdote about Benjamin Franklin.

Source snippets:
[D4-C0562] (from 04-benjamin-franklin-abbott-1876.txt)
"No," said I laughing, "because Mr. Franklin has no----" I was going to say what I did not say, and will not say here. I stopped short, and laughed. "No," said M. Marbois. "Mr. Franklin adores only great Nature; which has interested a great many people of both sexes in his favor." "Yes," said I laughing, "all the atheists, deists and libertines, as well as the philosophers and ladies are in his train."[29] [Footnote 29: Works of John Adams, Vol. III, p. 220.] The English lords were exasperated by the reception France had given Franklin. They fully comprehended its significance. France was in sympathy with the Americans, in their heroic endeavor to escape from the despotism of the British crown. Thus the traffic which had enriched England, would be transferred to France. Even the Earl of Chatham said, in one of the most eloquent of his speeches,

[D4-C0481] (from 04-benjamin-franklin-abbott-1876.txt)
Franklin immediately commenced packing his trunks. Astonishing, almost incredible as it may appear, the evidence seems conclusive that through all these trying scenes, Franklin was a cheerful, it is hardly too strong a word to use, a _jovial_ man. It has been well said, that to be angry is to punish one's self for the sins of another. Our philosopher had no idea of making himself unhappy, because British lords behaved like knaves. He continued to be one of the most entertaining of companions. A cloudless sun seemed to shine wherever he moved. He made witty speeches. He wrote the most amusing articles for the journals, and the invariable gayety of his mind caused his society to be eagerly sought for.

[D6-C0128] (from 06-benjamin-franklin-more-1900.txt)
Whitehead, who is very shrewd, soon after began to smoke it, and looking in my face, said, 'I'll be hanged if this is not some of your American jokes upon us.' The reading went on, and ended with abundance of laughing, and a general verdict that it was a fair hit."

[D4-C0495] (from 04-benjamin-franklin-abbott-1876.txt)
[Footnote 25: "And here perhaps we have one of the reasons why Dr. Franklin, who was universally confessed to be the ablest pen in America, was not always asked to write the great documents of the Revolution. He would have put a joke into the Declaration of Independence, if it had fallen to him to write it. At this time he was a humorist of fifty years standing, and had become fixed in the habit of illustrating great truths by grotesque and familiar similes. His jokes, the circulating medium of Congress, were as helpful to the cause, as Jay's conscience or Adams' fire; they restored good humor, and relieved the tedium of delay, but were out of place in formal, exact and authoritative papers."--_Parton's Franklin_, Vol. 2. p. 85.] One of Franklin's jokes, in Congress, is very characteristic of the man. It was urged that the Episcopal clergy should be directed to refrain from praying for the king. Franklin quenched the injudicious movement with a witticism.

[D2-C0031] (from 02-true-benjamin-franklin-fisher-1899.txt)
He seems to have been totally without either irritability or excitability. In this he was the reverse of Washington, who was subject to violent outbursts of anger, could swear “like an angel of God,” as one of his officers said, and had a fiery temper to control. Perhaps Franklin’s strong sense of humor saved him from oaths; there are no swearing stories recorded of him; instead of them we have innumerable jokes and witticisms. His anger when aroused was most deliberate, calculating, and judicious. His enemies and opponents he always ridiculed, often, however, with so little malice or sting that I have no doubt they were sometimes compelled to join in the laugh. He never attacked or abused.

[D4-C0506] (from 04-benjamin-franklin-abbott-1876.txt)
Washington was assembling quite an army of American troops around Boston, holding the foe in close siege there. Franklin was sent, by Congress, as one of a committee of three, to confer with Washington upon raising and supplying the American army. Amidst all these terrific excitements and perils this wonderful man could not refrain from giving expression to his sense of the ludicrous. The day before leaving Philadelphia, he wrote to Dr. Priestly the following humorous summary of the result of the British operations thus far.

[D3-C0609] (from 03-boyhood-to-manhood-thayer.txt)
Benjamin was taken by surprise, and scarcely knew what to say. Rallying himself, however, he replied: "You are not the John Collins I invited to accompany me to Philadelphia. I don't wish for _your_ company." "You are joking, Ben, old fellow"; and another pat on his back. "I invited John Collins _sober_ to go to Philadelphia with me; you are John Collins _drunk_." "Complimentary again," answered John, with a show of temper. "It is time," retorted Benjamin, "It is putting me into an embarrassing situation to be tied to a drunken companion. I rather be excused." "Don't see how I can 'scuse you, Ben. It is too late now." And the boozy fellow appeared not to imagine that he was making a fool of himself. On reaching John's boarding place, the landlord said: "He has been drunk ever since he reached New York; and he has gambled, too, I judge." "What makes you think he has gambled?" "Because he is out of money now; every cent he had is gone, I think." "And he owes you for board and lodgings?"

[D2-C0165] (from 02-true-benjamin-franklin-fisher-1899.txt)
“In old Time it was no disrespect for Men and Women to be called by their own Names: _Adam_ was never called _Master_ Adam; we never read of Noah _Esquire_, Lot _Knight_ and _Baronet_, nor the _Right Honourable_ Abraham, Viscount of Mesopotamia, _Baron_ of Canaan; no, no, they were plain Men, honest Country Grasiers, that took care of their Families and Flocks. Moses was a great Prophet, and _Aaron_ a priest of the Lord; but we never read of the _Reverend_ Moses, nor the Right Reverend Father in God Aaron, by Divine Providence, _Lord Arch-Bishop_ of Israel; Thou never sawest _Madam_ Rebecca in the Bible, my _Lady_ Rachel: nor Mary, tho’ a Princess of the Blood after the death of _Joseph_, called the Princess Dowager of Nazareth.” This was funny, irreverent, and reckless, and shows a mind entirely out of sympathy with its surroundings. In after-years Franklin wrote several humorous parodies on the Scriptures, but none that was quite so shocking to religious people as this one.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Franklin was known for his strong sense of humor, making witty speeches, writing amusing articles, and telling jokes that helped restore good humor and relieve tension in Congress.",
      "chunk_ids": [
        "D4-C0481",
        "D4-C0495",
        "D2-C0031"
      ]
    },
    {
      "text": "One characteristic joke in Congress occurred when he used a witticism to quench an injudicious movement urging the Episcopal clergy to refrain from praying for the king.",
      "chunk_ids": [
        "D4-C0495"
      ]
    }
  ]
}
```
</details>

### Q10. A time Benjamin Franklin failed or made a serious mistake.

**Status:** answered

**Search phrasings:** “A time Benjamin Franklin failed or made a serious mistake.” · “Benjamin Franklin made a serious mistake, an error he or she regretted” · “Benjamin Franklin failed, a blunder, an erratum, a wrong decision and its consequences”

**Retrieval gate:** best cosine 0.5827 (min 0.3), best BM25 8.646 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0707 | 0.51 | 0.2709 | 8.357 | Franklin made a great mistake in not agreeing with him, for in the suspicious state of peo… |
| 2 | D4-C0110 | 0.5602 | 0.2466 | 7.103 | [Illustration] This breaking in upon his friend Vernon's money, and spending it, he pronou… |
| 3 | D2-C0744 | 0.491 | 0.2489 | 0 | But Franklin heartily approved of it, and in 1790 protested most earnestly against a chang… |
| 4 | D3-C0168 | 0.4875 | 0.2494 | 8.054 | "And that makes your guilt so much the greater. Will you learn a lesson from this, and nev… |
| 5 | D2-C0672 | 0.5111 | 0.2817 | 0 | This conduct was so offensive to Vergennes that he complained of it to Franklin, who was o… |
| 6 | D2-C0139 | 0.5559 | 0.2226 | 0 | Fifteen or twenty years afterwards, with added experience, Franklin became a very differen… |
| 7 | D4-C0139 | 0.575 | 0.2035 | 8.646 | [Footnote 8: Franklin writes in his autobiography, "I grew fond of her company, and being … |
| 8 | D4-C0027 | 0.5827 | 0.2298 | 0 | There was a marsh, flooded at high tides, where the boys used to fish for minnows. Much tr… |

**Answer (each sentence checked):**

- Franklin pronounced breaking into his friend Vernon's money and spending it to be the first great error of his life in his autobiography. [D4-C0110]
- He also referred to another incident involving a wharf of stones built from materials meant for a man's cellar as a wrong act. [D3-C0168, D4-C0027]
- Additionally, he mentioned in his autobiography attempting to take liberties with a companion while under no religious restraint as another erratum. [D4-C0139]
- He also made a great mistake by not agreeing with Jay, which was taken as proof of his subserviency to the French court. [D2-C0707]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: A time Benjamin Franklin failed or made a serious mistake.

Source snippets:
[D2-C0707] (from 02-true-benjamin-franklin-fisher-1899.txt)
Franklin made a great mistake in not agreeing with him, for in the suspicious state of people’s minds at that time his conduct in this respect was taken as proof positive of his subserviency to the French court. Jay suspected that Vergennes advised accepting Oswald’s commission so as to prevent a clear admission of independence, and thus keep the United States embroiled with England as long as possible. In order to support his opposition to Jay, Franklin was obliged to talk about his confidence in the French court, its past generosity and friendliness, and also to call attention to the instruction of Congress that the commissioners should do nothing without the knowledge of the French government, and in all final decisions be guided by that government’s advice.

[D4-C0110] (from 04-benjamin-franklin-abbott-1876.txt)
[Illustration] This breaking in upon his friend Vernon's money, and spending it, he pronounces in his autobiography, to have been the _first great error_ of his life. Though it so chanced that the money was not required until Franklin was able to pay it, yet for several months he was in the endurance of intense mental anxiety and constant self-reproach.

[D2-C0744] (from 02-true-benjamin-franklin-fisher-1899.txt)
But Franklin heartily approved of it, and in 1790 protested most earnestly against a change. He argued at length against a single executive and in favor of a single house Legislature in the teeth of innumerable facts proving the utter impracticability of both. No other important public men of the time believed in them, and they had been rejected in the national Constitution. He was, however, as humorous and clever in this argument as if he had been in the right. A double-branch Legislature would, he said, be too weak in each branch to support a good measure or obstruct a bad one.

[D3-C0168] (from 03-boyhood-to-manhood-thayer.txt)
"And that makes your guilt so much the greater. Will you learn a lesson from this, and never do the like again?" "I promise that I never will." Thus frankly Benjamin confessed his wrong-doing; and, in mature life, he often referred to it as his "_first wrong act_" from which he learned a lesson for life. It was another way of _paying too dear for a whistle_. What the whistle was to him at seven, the wharf of stones was to him at twelve years of age--sport. The first was innocent sport, however; the last was guilty.

[D2-C0672] (from 02-true-benjamin-franklin-fisher-1899.txt)
This conduct was so offensive to Vergennes that he complained of it to Franklin, who was obliged to rebuke Adams; and Congress, when the matter came before it, administered another rebuke. Adams never forgave Franklin for this, and afterwards publicly declared that Franklin and Vergennes had conspired to destroy his influence and ruin him. At the time, however, he had the good sense to take his rebuff in silence, and went off grumbling to Holland to see if something could not be done to render the United States less dependent on France.

[D2-C0139] (from 02-true-benjamin-franklin-fisher-1899.txt)
Fifteen or twenty years afterwards, with added experience, Franklin became a very different sort of person. The man of forty, laboriously investigating science, discovering the secrets of electricity, and rejecting everything that had not been subjected to the most rigid proof, bore but little resemblance to the precocious youth of twenty-three, the victim of any specious sophism that promised a millennium. But he never fully apologized to the world for his paper-money delusion, contenting himself with saying in his Autobiography, “I now think there are limits beyond which the quantity may be hurtful.”

[D4-C0139] (from 04-benjamin-franklin-abbott-1876.txt)
[Footnote 8: Franklin writes in his autobiography, "I grew fond of her company, and being at that time under no religious restraint, and taking advantage of my importance to her, I attempted to take some liberties with her, another _erratum_, which she repulsed with a proper degree of resentment. She wrote to Ralph and acquainted him with my conduct. This occasioned a breach between us; and when he returned to London, he let me know he considered all the obligations he had been under to me as annulled."--Works of Franklin, Vol. i, p. 59.]

[D4-C0027] (from 04-benjamin-franklin-abbott-1876.txt)
There was a marsh, flooded at high tides, where the boys used to fish for minnows. Much trampling had converted the spot into a quagmire. A man was about to build a house near by, and had carted a large quantity of stones for the cellar. Franklin called the boys together and suggested that they should go in the evening, take those stones, and build a wharf upon which they could stand with dry feet. It was done. And under the skilful engineering of the youthful Franklin, it was quite scientifically done. Complaints and detection followed. Josiah Franklin severely reproved Benjamin for the dishonest act, but it does not appear that the conscience of the precocious boy was much troubled. He argued very forcibly that the utility of the measure proved its necessity.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{"status": "answered", "sentences": [{"text": "Franklin pronounced breaking into his friend Vernon's money and spending it to be the first great error of his life in his autobiography.", "chunk_ids": ["D4-C0110"]}, {"text": "He also referred to another incident involving a wharf of stones built from materials meant for a man's cellar as a wrong act.", "chunk_ids": ["D3-C0168", "D4-C0027"]}, {"text": "Additionally, he mentioned in his autobiography attempting to take liberties with a companion while under no religious restraint as another erratum.", "chunk_ids": ["D4-C0139"]}, {"text": "He also made a great mistake by not agreeing with Jay, which was taken as proof of his subserviency to the French court.", "chunk_ids": ["D2-C0707"]}]}
```
</details>

### Q11. The hardest thing Benjamin Franklin went through.

**Status:** not in the sources — The LLM found no answer in the retrieved snippets.

**Search phrasings:** “The hardest thing Benjamin Franklin went through.” · “the hardest trial of Benjamin Franklin life, grief and suffering” · “the death of a loved one, illness, sorrow, affliction that Benjamin Franklin endured”

**Retrieval gate:** best cosine 0.64 (min 0.3), best BM25 15.613 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0578 | 0.5268 | 0.2816 | 12.728 | "In Philadelphia. Has not Captain Homes told you where I was?" "Not a word from him about … |
| 2 | D4-C0059 | 0.5827 | 0.2443 | 13.618 | [Footnote 4: "For some years he wandered in heathenish darkness. He forsook the safe and g… |
| 3 | D4-C0249 | 0.5383 | 0.2448 | 0 | "Last night died Mr. Josiah Franklin, tallow chandler, and soap maker. By the force of ste… |
| 4 | D2-C0253 | 0.64 | 0.2584 | 5.872 | “Dr. Benjamin Franklin has told the world in poetry what, in his judgment, my ancestor was… |
| 5 | D6-C0148 | 0.3949 | 0.0923 | 7.959 | [2] They must embrace like Frenchmen. [3] How charming it was to see Solon and Sophocles e… |
| 6 | D3-C0639 | 0.5089 | 0.2699 | 8.133 | The trial resulted about as Benjamin anticipated, and he got out of it as much fun as he e… |
| 7 | D2-C0072 | 0.4626 | 0.3245 | 15.613 | His physician, Dr. Jones, has described his last illness,-- “About sixteen days before his… |
| 8 | D3-C0468 | 0.5205 | 0.2686 | 8.109 | The case of William Hutton, who was the son of very poor parents, is very similar to that … |

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: The hardest thing Benjamin Franklin went through.

Source snippets:
[D3-C0578] (from 03-boyhood-to-manhood-thayer.txt)
"In Philadelphia. Has not Captain Homes told you where I was?" "Not a word from him about it." "He wrote to me from Newcastle three months ago, and I replied to his letter. I supposed that you had heard all about it before this time." "We have not heard the least thing from you since you left," said his father; "and they have been seven very long and painful months." "How painful, Benjamin, you can never know," added his mother. "Sometimes it has seemed as if my old heart would break with grief; but I have tried to cast my burden on the Lord. If you had staid at home and died, my sorrow could not have been so great." "Let it end now," replied Benjamin, with a smile, "for I am here again." "Yes, I thank my God, for 'this my son was dead, and is alive again; he was lost, and is found.'" And his mother came almost as near to death with joy, as she had been before with sorrow.

[D4-C0059] (from 04-benjamin-franklin-abbott-1876.txt)
[Footnote 4: "For some years he wandered in heathenish darkness. He forsook the safe and good though narrow way of his forefathers, and of his father and mother, and his gentle Uncle Benjamin, without finding better and larger ways of his own. He was in danger of becoming a castaway or a commonplace successful man of the world. He found in due time, after many trials, and much suffering and many grievous errors, that the soul of a man does not thrive upon negations, and that, in very truth a man must _believe_ in order that he may be saved."--_Parton's Life of Franklin, Vol. I, p. 71._]

[D4-C0249] (from 04-benjamin-franklin-abbott-1876.txt)
"Last night died Mr. Josiah Franklin, tallow chandler, and soap maker. By the force of steady temperance he had made a constitution, none of the strongest, last with comfort to the age of eighty-nine years. And by an entire dependence on his Redeemer, and a constant course of the strictest piety and virtue, he was enabled to die as he lived, with cheerfulness and peace, leaving a numerous posterity the honor of being descended from a person who, through a long life, supported the character of an honest man."

[D2-C0253] (from 02-true-benjamin-franklin-fisher-1899.txt)
“Dr. Benjamin Franklin has told the world in poetry what, in his judgment, my ancestor was. His venerable shade will excuse me, if I tell in prose what, in the judgment of men who lived near a century ago, Dr. Smith was not: He was no almanack maker, nor quack, nor chimney-doctor, nor soap boiler, nor printer’s devil, neither was he a deist; and all his children were born in wedlock. He bequeathed no old and irrecoverable debts to a hospital. He never cheated the poor during his life nor mocked them in his death. If his descendants cannot point to his statue over a library, they have not the mortification of hearing him daily accused of having been a fornicator, a hypocrite, and an infidel.”

[D6-C0148] (from 06-benjamin-franklin-more-1900.txt)
[2] They must embrace like Frenchmen. [3] How charming it was to see Solon and Sophocles embrace. The mention of John Adams recalls us to the most disagreeable part of Franklin's experience. During all his sojourn in France he was subject to continual and annoying interference from his colleagues. Before his arrival in Paris, Silas Deane had entered for Congress into semi-commercial relations with the French government through the eccentric and industrious Beaumarchais. Franklin was content to leave these affairs to him, and did not at the time even know their real nature. But with Arthur Lee it was different. Of all characters in American history Lee is almost the hardest to endure. He was patriotic, and in a way honest, but meddlesome, suspicious, vain, and quarrelsome to an incredible degree. He immediately made up his mind that Deane was peculating, and never ceased writing accusatory letters until Congress recalled the unfortunate envoy.

[D3-C0639] (from 03-boyhood-to-manhood-thayer.txt)
The trial resulted about as Benjamin anticipated, and he got out of it as much fun as he expected. Keimer proved himself a greater pig than the one he swallowed. At the same time, the result left Keimer without a claim on Benjamin to advocate the new sect. So the scheme was dropped. Keimer was no match for Benjamin in disputation. With the use of the Socratic way of reasoning, Benjamin discomfited him every time; so that he grew shy and suspicious. In his ripe years, Benjamin wrote of those days, and said:

[D2-C0072] (from 02-true-benjamin-franklin-fisher-1899.txt)
His physician, Dr. Jones, has described his last illness,-- “About sixteen days before his death he was seized with a feverish indisposition, without any particular symptoms attending it, till the third or fourth day, when he complained of a pain in the left breast, which increased till it became extremely acute, attended with a cough and laborious breathing. During this state when the severity of his pains drew forth a groan of complaint, he would observe--that he was afraid he did not bear them as he ought--acknowledged his grateful sense of the many blessings he had received from that Supreme Being, who had raised him from small and low beginnings to such high rank and consideration among men--and made no doubt but his present afflictions were kindly intended to wean him from a world, in which he was no longer fit to act the part assigned him.

[D3-C0468] (from 03-boyhood-to-manhood-thayer.txt)
The case of William Hutton, who was the son of very poor parents, is very similar to that of Benjamin Franklin. He was bound to his uncle for a series of years, but he was treated so harshly that he ran away, at seventeen years of age. The record is, that "on the 12th day of July, 1741, the ill-treatment he received from his uncle in the shape of a brutal flogging, with a birch-broom handle of white hazel, which almost killed him, caused him to run away." A dark prospect was before him, since "he had only twopence in his pocket, a spacious world before him, and no plan of operation." Yet he became an author of much celebrity, and a most exemplary and influential man. He lived to the age of ninety, his last days being gladdened by the reflection of having lived a useful life, and the consciousness of sharing the confidence of his fellow-men. This description of Hutton would apply almost equally well to Franklin. XIX. TRIALS OF A RUNAWAY.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "not_in_sources",
  "sentences": []
}
```
</details>

### Q12. Who did Benjamin Franklin marry, and what was that relationship like?

**Status:** answered

**Search phrasings:** “Who did Benjamin Franklin marry, and what was that relationship like?” · “Benjamin Franklin married, the wife or husband of Benjamin Franklin” · “courtship, wedding, married life and the relationship between husband and wife”

**Retrieval gate:** best cosine 0.6343 (min 0.3), best BM25 13.947 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0230 | 0.5131 | 0.4259 | 13.947 | [Illustration: WILLIAM TEMPLE FRANKLIN] Franklin’s detractors have always insisted that no… |
| 2 | D2-C0228 | 0.4491 | 0.3139 | 10.282 | But to return to his designs for a wife, which were by no means romantic. Miss Read, for w… |
| 3 | D3-C0057 | 0.6164 | 0.3466 | 11.652 | So young and large a family needed a mother's watch and care, as Josiah Franklin found to … |
| 4 | D6-C0065 | 0.5362 | 0.2763 | 9.025 | With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the sa… |
| 5 | D2-C0687 | 0.477 | 0.3249 | 11.795 | Madame Helvetius, a still more intimate friend, was a very different sort of woman. She wa… |
| 6 | D4-C0194 | 0.5601 | 0.4036 | 11.391 | Occasionally Franklin had gone to the home of Mrs. Read, the mother of the unhappy Deborah… |
| 7 | D6-C0067 | 0.6343 | 0.3703 | 8.793 | This was the first appearance of plate and china in our house, which afterward, in a cours… |
| 8 | D2-C0222 | 0.5089 | 0.4695 | 8.086 | A young man such as he was is not infrequently able to improve his morals more effectually… |

**Answer (each sentence checked):**

- Benjamin Franklin married Miss Read, also referred to as Deborah, on September 1, 1730. [D6-C0065, D4-C0194]
- Some detractors insisted they were never legally married and only had a common-law marriage, though they intended marriage and regarded themselves as husband and wife. [D2-C0230]
- Franklin did not marry her out of romantic or exalted affection, but she made him a good wife despite her temper not being the serenest. [D2-C0228, D6-C0067]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Who did Benjamin Franklin marry, and what was that relationship like?

Source snippets:
[D2-C0230] (from 02-true-benjamin-franklin-fisher-1899.txt)
[Illustration: WILLIAM TEMPLE FRANKLIN] Franklin’s detractors have always insisted that no marriage ceremony was performed and that he was never legally married. There is no record of such a marriage in Christ Church, of which Mrs. Rogers was a member, and the phrase used, “took her to wife,” is supposed to show that they simply lived together, fearing a regular ceremony, which, if Rogers was alive, would convict them of bigamy. The absence of any record of a ceremony is, however, not necessarily conclusive that there was no ceremony of any kind; and the question is not now of serious importance, for they intended marriage, always regarded themselves as man and wife, and, in any event, it was a common-law marriage. Their children were baptized in Christ Church as legitimate children, and in a deed executed three or four years after 1730 they are spoken of as husband and wife.

[D2-C0228] (from 02-true-benjamin-franklin-fisher-1899.txt)
But to return to his designs for a wife, which were by no means romantic. Miss Read, for whom he had a partiality, had married one Rogers during Franklin’s absence in London. Rogers ill treated and deserted her, and, dejected and melancholy, she was now living at home with her mother. She and Franklin had been inclined to marry before he went to London, but her mother prevented it. According to his account, she had been in love with him; but, although he liked her, we do not understand that he was in love. He never seems to have been in love with any woman in the sense of a romantic or exalted affection, although he flirted with many, both young and old, almost to the close of his life.

[D3-C0057] (from 03-boyhood-to-manhood-thayer.txt)
So young and large a family needed a mother's watch and care, as Josiah Franklin found to his sorrow. The additional burden laid upon him by the death of his wife interfered much with his business, and he saw fresh reasons each day for finding another help-mate as soon as possible. To run his business successfully, and take the whole charge of his family, was more than he could do. In these circumstances he felt justified in marrying again as soon as possible, and, with the aid of interested friends, he made a fortunate choice of Abiah Folger, of Nantucket, a worthy successor of the first Mrs. Franklin. He married her a few months after the death of his first wife. The second Mrs. Franklin became the mother of ten children, which, added to those of the first Mrs. Franklin, constituted a very respectable family of seventeen children, among whom was Benjamin, the fifteenth child. His "Autobiography" says: "Of the seventeen children I remember to have seen thirteen sitting together at the table, who all grew up to years of maturity and were married." Of the second wife it says: "My mother, the second wife of my father, was Abiah Folger, daughter of Peter Folger, one of the first settlers of New England, of whom honorable mention is made by Cotton Mather in his ecclesiastical history of that country, 'as a godly and learned Englishman.'"

[D6-C0065] (from 06-benjamin-franklin-more-1900.txt)
With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the same house with him, and now Mrs. Godfrey undertook to make a match between him and the daughter of a relative of hers. Franklin's account of this affair for its coolness and placidity may almost be compared with Gibbon's "I sighed as a lover, I obeyed as a son." On learning that the girl's parents could not or would not give with her enough money to pay off his debts, the gallant suitor at once and irrevocably withdrew. He then looked about him for another match, but found to his chagrin that an adventurous printer could not command an agreeable wife and a dowry at the same time. Being determined to marry, that he might bring order into his life, he at last turned to Miss Read, with whom he had maintained a friendly correspondence, and notwithstanding the difficulties in the way married her on the 1st of September, 1730.

[D2-C0687] (from 02-true-benjamin-franklin-fisher-1899.txt)
Madame Helvetius, a still more intimate friend, was a very different sort of woman. She was the widow of a literary man of some celebrity, and she and Franklin were always carrying on an absurd sort of flirtation. They hugged and kissed each other in public, and exchanged extravagant notes which were sometimes mock proposals of marriage, although some have supposed them to have been real ones. He wrote a sort of essay addressed to her, in which he imagines himself in the other world, where he meets her husband, and, after the exchange of many clever remarks with him about madame, he discovers that Helvetius is married to his own deceased wife, Mrs. Franklin, who declares herself rather better pleased with him than she had been with the Philadelphia printer. “Indignant at this refusal of my Eurydice, I immediately resolved to quit those ungrateful shades, and return to this good world again, to behold the sun and you! Here I am: let us _avenge ourselves_!”

[D4-C0194] (from 04-benjamin-franklin-abbott-1876.txt)
Occasionally Franklin had gone to the home of Mrs. Read, the mother of the unhappy Deborah. His conscience reproached him for his conduct to that good girl. She was always dejected and solitary, and with a broken heart clung to her mother, her only friend. It is doubtful whether she were ever legally married to Rogers. It was rumored that at the time of their marriage, he was the husband of one, if not more wives. If legally married, there was another serious obstacle in her path. Rogers had run away to the West Indies. Rumor alone had announced his death. He might be still living. Franklin's sympathy gradually became excited in her behalf. And at length he proposed that, regardless of all the risks, they should be married. It seems that he had announced to her very distinctly that he had a living child, and very honorably he had decided that that child of dishonor was to be taken home and trained as his own.

[D6-C0067] (from 06-benjamin-franklin-more-1900.txt)
This was the first appearance of plate and china in our house, which afterward, in a course of years as our wealth increased, augmented gradually to several hundred pounds in value." Mrs. Franklin's temper was not of the serenest, and her manners perhaps were not such as would have honored him had she followed him into the great world; but she made him a good wife,--and we need not repeat the tattle which we are told is still current among some of the high families of Philadelphia. They had two children,--a son, the idol of his father's heart, who died as a child; and a daughter, who married Richard Bache, and is the ancestress of a large family.

[D2-C0222] (from 02-true-benjamin-franklin-fisher-1899.txt)
A young man such as he was is not infrequently able to improve his morals more effectually by marrying than by writing liturgies and codes. He decided to marry about two years after he had begun to discipline himself in his creed and moral precepts. The step seems to have been first suggested to him by Mrs. Godfrey, to whom, with her husband, he rented part of his house and shop. She had a relative who, she thought, would make a good match for him, and she took opportunities of bringing them often together. The girl was deserving, and Franklin began to court her. But he has described the affair so well himself that it would be useless to try to abbreviate it.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin married Miss Read, also referred to as Deborah, on September 1, 1730.",
      "chunk_ids": [
        "D6-C0065",
        "D4-C0194"
      ]
    },
    {
      "text": "Some detractors insisted they were never legally married and only had a common-law marriage, though they intended marriage and regarded themselves as husband and wife.",
      "chunk_ids": [
        "D2-C0230"
      ]
    },
    {
      "text": "Franklin did not marry her out of romantic or exalted affection, but she made him a good wife despite her temper not being the serenest.",
      "chunk_ids": [
        "D2-C0228",
        "D6-C0067"
      ]
    }
  ]
}
```
</details>

### Q13. What about Benjamin Franklin's children?

**Status:** answered

**Search phrasings:** “What about Benjamin Franklin's children?” · “Benjamin Franklin's children, son and daughter” · “the son of Benjamin Franklin, the daughter of Benjamin Franklin, a child born or died”

**Retrieval gate:** best cosine 0.6927 (min 0.3), best BM25 15.611 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0022 | 0.6345 | 0.368 | 12.053 | Boston was then a straggling village, of five or six thousand inhabitants. In front spread… |
| 2 | D2-C0244 | 0.5644 | 0.3648 | 13.646 | [Illustration: MRS. SARAH BACHE] The other child was a daughter, Sarah, also very handsome… |
| 3 | D4-C0353 | 0.6377 | 0.3947 | 14.02 | His influential and wealthy friend, Mr. Strahan, was anxious to unite their two families b… |
| 4 | D3-C0056 | 0.6228 | 0.3926 | 13.321 | Mr. Franklin had three children when he left Banbury, and four more were given to him duri… |
| 5 | D3-C0049 | 0.6268 | 0.347 | 12.604 | Mr. Franklin spoke out of the depths of his soul. He was a true Christian man, and took th… |
| 6 | D6-C0067 | 0.6442 | 0.3867 | 15.611 | This was the first appearance of plate and china in our house, which afterward, in a cours… |
| 7 | D3-C0057 | 0.6927 | 0.4367 | 8.945 | So young and large a family needed a mother's watch and care, as Josiah Franklin found to … |
| 8 | D2-C0791 | 0.4839 | 0.3836 | 12.47 | This may be what the reviewer had in his mind. But Franklin nowhere calls Miss Stevenson h… |

**Answer (each sentence checked):**

- Benjamin Franklin had a daughter named Sarah who married Richard Bache and left numerous descendants, and another daughter who was married to John Foxcroft. [D2-C0244, D6-C0067]
- He also had an illegitimate son named William, whose own son was named William Temple Franklin. [D2-C0244, D4-C0353]
- Franklin and his wife also had a son who died as a child. [D6-C0067]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: What about Benjamin Franklin's children?

Source snippets:
[D4-C0022] (from 04-benjamin-franklin-abbott-1876.txt)
Boston was then a straggling village, of five or six thousand inhabitants. In front spread out its magnificent bay, with its beautiful islands. In the rear the primeval forest extended, almost unbroken, through unexplored wilds to the Pacific. His trade was that of a dyer. Finding, however, but little employment in that business, he set up as a tallow chandler and soap boiler. Four years of life's usual joys and sorrows passed away when Mrs. Franklin died, leaving six children. The eldest was but eleven years of age. This motherless little family needed a maternal guardian. Within the year, Mr. Franklin married Abiah Folger, of Nantucket. She was the youngest daughter of Peter Folger, a man illustrious for many virtues, and of whom it has been well said, that "he was worthy to be the grandfather of Benjamin Franklin." She proved to be a noble woman, and was all that either husband or children could wish for. Ten children were the fruit of this union. Benjamin was born on the sixth of January, (O. S.) 1706.

[D2-C0244] (from 02-true-benjamin-franklin-fisher-1899.txt)
[Illustration: MRS. SARAH BACHE] The other child was a daughter, Sarah, also very handsome, who married Richard Bache and has left numerous descendants. His illegitimate son, William, was brought home when he was a year old and cared for along with his other children; and William’s illegitimate son, Temple Franklin, was the companion and secretary of his grandfather in England and France. The illegitimate daughter was apparently never brought home, and is not referred to in his writings, except in those occasional letters in which he sends her his love. According to the letter already mentioned as in the collection of the Pennsylvania Historical Society, she was married to John Foxcroft, who was deputy colonial postmaster in Philadelphia. It was well that she was kept away from Franklin’s house, for the presence of William appears to have given trouble enough. A household composed of legitimate and illegitimate children is apt to be inharmonious at times, especially when the mother of the legitimate children is the mistress of the house.

[D4-C0353] (from 04-benjamin-franklin-abbott-1876.txt)
His influential and wealthy friend, Mr. Strahan, was anxious to unite their two families by the marriage of his worthy and prosperous son to Mr. Franklin's beautiful daughter, Sarah. But the plan failed. Franklin also made an effort to marry his only son William, who, it will be remembered, was not born in wedlock, to a very lovely English lady, Miss Stephenson. But this young man, who, renouncing revealed religion, was a law unto himself, had already become a father without being a husband. Miss Stephenson had probably learned this fact and, greatly to the disappointment of Franklin, declined the alliance. The unhappy boy, the dishonored son of a dishonored father, was born about the year 1760. Nothing is known of what became of the discarded mother. He received the name of William Temple Franklin.

[D3-C0056] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin had three children when he left Banbury, and four more were given to him during the first four years of his residence in Boston, one of whom died. Soon after the birth of the seventh child Mrs. Franklin died.

[D3-C0049] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin spoke out of the depths of his soul. He was a true Christian man, and took the Christian view of a child, as he did of any thing else. While some men are annoyed by the multiplicity of children, he found a source of comfort and contentment in the possession. The seventeenth child, which number he had, he hailed with the same grateful recognition of God's providence that he did when the first was born. Yet he was poor, and found himself face to face with poverty most of the time. Each child born was born to an inheritance of want. But to him children were God's gift as really as sunshine or showers, day or night, the seventeenth just as much so as the first. This fact alone marks Josiah Franklin as an uncommon man for his day or ours. "If more men and women were of your opinion," continued the relative, "there would be much more enjoyment and peace in all communities. The most favorable view that a multitude of parents indulge is, that children are troublesome comforts."

[D6-C0067] (from 06-benjamin-franklin-more-1900.txt)
This was the first appearance of plate and china in our house, which afterward, in a course of years as our wealth increased, augmented gradually to several hundred pounds in value." Mrs. Franklin's temper was not of the serenest, and her manners perhaps were not such as would have honored him had she followed him into the great world; but she made him a good wife,--and we need not repeat the tattle which we are told is still current among some of the high families of Philadelphia. They had two children,--a son, the idol of his father's heart, who died as a child; and a daughter, who married Richard Bache, and is the ancestress of a large family.

[D3-C0057] (from 03-boyhood-to-manhood-thayer.txt)
So young and large a family needed a mother's watch and care, as Josiah Franklin found to his sorrow. The additional burden laid upon him by the death of his wife interfered much with his business, and he saw fresh reasons each day for finding another help-mate as soon as possible. To run his business successfully, and take the whole charge of his family, was more than he could do. In these circumstances he felt justified in marrying again as soon as possible, and, with the aid of interested friends, he made a fortunate choice of Abiah Folger, of Nantucket, a worthy successor of the first Mrs. Franklin. He married her a few months after the death of his first wife. The second Mrs. Franklin became the mother of ten children, which, added to those of the first Mrs. Franklin, constituted a very respectable family of seventeen children, among whom was Benjamin, the fifteenth child. His "Autobiography" says: "Of the seventeen children I remember to have seen thirteen sitting together at the table, who all grew up to years of maturity and were married." Of the second wife it says: "My mother, the second wife of my father, was Abiah Folger, daughter of Peter Folger, one of the first settlers of New England, of whom honorable mention is made by Cotton Mather in his ecclesiastical history of that country, 'as a godly and learned Englishman.'"

[D2-C0791] (from 02-true-benjamin-franklin-fisher-1899.txt)
This may be what the reviewer had in his mind. But Franklin nowhere calls Miss Stevenson his daughter. The word daughter and child are very different. We all of us often call children we fancy “my child.” Franklin’s use of the word child as applied to Miss Stevenson has from the context of the letters a perfectly obvious meaning,--no one can mistake it; just as his use of the word daughter in the Foxcroft letters has, from the context and all the circumstances, a perfectly obvious meaning. It would be endless to discuss all the reviewer’s irrelevant and extravagant statements. We shall call attention to only one other illustration of his methods. He closes one of his wild paragraphs by saying that if “Mr. Fisher wishes further knowledge on this subject for ‘speculation,’ we recommend him to read Franklin’s letter to Foxcroft of September 7, 1774.”

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin had a daughter named Sarah who married Richard Bache and left numerous descendants, and another daughter who was married to John Foxcroft.",
      "chunk_ids": [
        "D2-C0244",
        "D6-C0067"
      ]
    },
    {
      "text": "He also had an illegitimate son named William, whose own son was named William Temple Franklin.",
      "chunk_ids": [
        "D2-C0244",
        "D4-C0353"
      ]
    },
    {
      "text": "Franklin and his wife also had a son who died as a child.",
      "chunk_ids": [
        "D6-C0067"
      ]
    }
  ]
}
```
</details>

### Q14. Who were Benjamin Franklin's closest friends or mentors?

**Status:** answered

**Search phrasings:** “Who were Benjamin Franklin's closest friends or mentors?” · “Benjamin Franklin's closest friend and companions” · “a mentor or patron who advised, encouraged and helped Benjamin Franklin”

**Retrieval gate:** best cosine 0.6737 (min 0.3), best BM25 8.749 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0112 | 0.6737 | 0.3888 | 8.749 | Almost every young man has a few particular friends. The three most intimate companions of… |
| 2 | D3-C0673 | 0.5549 | 0.2631 | 6.145 | "I shall do that, Ben, you may rest assured; for I will not take advantage of your generos… |
| 3 | D4-C0279 | 0.6224 | 0.3233 | 0 | Franklin was best loved where he was best known. And this was right; for he was ever confe… |
| 4 | D3-C0740 | 0.5754 | 0.2528 | 5.799 | "Very wise for her, I think," responded Benjamin. "But she may consider herself fortunate … |
| 5 | D2-C0417 | 0.6345 | 0.3153 | 0 | The second year his election to the office was opposed; an influential member wanted the p… |
| 6 | D4-C0102 | 0.6243 | 0.2584 | 4.61 | There was in Boston a young man by the name of Collins, a reckless, dissipated spendthrift… |
| 7 | D3-C0270 | 0.3469 | -0.005 | 8.295 | "What is that?" "Cocker's Arithmetic." "Begin to wish that you knew something of arithmeti… |
| 8 | D4-C0632 | 0.5401 | 0.2748 | 0 | "I wish to know the opinion of my venerable friend, concerning Jesus of Nazareth. He will … |

**Answer (each sentence checked):**

- The three most intimate companions of Benjamin Franklin were young clerks of his own rank and age, including Joseph Watson, who was described as a pious and sensible young man of great integrity. [D4-C0112]
- Another intimate friend of Franklin was a young man named Collins, who was a reckless and dissipated spendthrift. [D4-C0102]
- Additionally, Franklin sought the advice of Mr. Denham, a Quaker merchant who showed him many favors and became deeply interested in him. [D3-C0673]
- He was also influenced by the preaching of his friend Mr. Whitefield, and he had Christian friends whose feelings he wished to avoid wounding. [D4-C0279, D4-C0632]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Who were Benjamin Franklin's closest friends or mentors?

Source snippets:
[D4-C0112] (from 04-benjamin-franklin-abbott-1876.txt)
Almost every young man has a few particular friends. The three most intimate companions of Benjamin Franklin were young men of his own rank and age, of very dissimilar characters, but having a common taste for business. They were all clerks. One of these, Joseph Watson, was, according to Franklin's description, "a pious, sensible young man of great integrity." It would seem that they were all persons of very estimable character, though some of them had imbibed Franklin's skeptical opinions. They spent many of their Sabbaths, wandering on the banks of the romantic Schuylkill, reading to each other their compositions in prose and verse.

[D3-C0673] (from 03-boyhood-to-manhood-thayer.txt)
"I shall do that, Ben, you may rest assured; for I will not take advantage of your generosity any longer than I can help. I mean to continue a good friend of yours whether you continue to be a good friend of mine or not." This was a shrewd way of putting it. Ralph knew the young man he was talking with thoroughly. Benjamin resolved to seek the advice of Mr. Denham. He was a Quaker merchant who sailed from Philadelphia with him. He was a stranger to him; but, when Colonel French came on board with letters from the governor at Newcastle, he introduced Benjamin to Denham. For this reason Denham became deeply interested in Benjamin, and showed him many favors. Now his advice would be specially useful to Benjamin; so he sought and found him.

[D4-C0279] (from 04-benjamin-franklin-abbott-1876.txt)
Franklin was best loved where he was best known. And this was right; for he was ever conferring deeds of kindness upon his neighbors. His religious views excited sorrow among his Christian friends. Others, composing perhaps a majority, cared nothing about what he believed. In conversation he ever frankly avowed himself a deist, though generally he made no attempt to convert others to his views. It is not improbable that he was in some degree influenced by the beneficial effect produced upon the popular mind by the preaching of his friend Mr. Whitefield.

[D3-C0740] (from 03-boyhood-to-manhood-thayer.txt)
"Very wise for her, I think," responded Benjamin. "But she may consider herself fortunate to get released from such a bondage." He improved the first opportunity to call at Mrs. Read's, to whom he appeared as one from the dead. She had not heard of his arrival, nor that he was expected. The _American Weekly Mercury_, the only newspaper of the town, announced, "Entered inwards, ship _Berkshire_, Henry Clark, from London." That was all; nothing was said about any passengers. "Benjamin Franklin!" exclaimed Mrs. Read in great astonishment, throwing up her hands at first, as if fearing it was his ghost, and then giving him a most cordial welcome. "Can it be you?" "It can be," Benjamin replied, with his old-time familiarity, being reassured by Mrs. Read's friendly appearance. "If I know myself, this is Benjamin Franklin." Deborah made her appearance before the last words were fairly off the lips of the new comer, equally surprised and glad to see her old friend.

[D2-C0417] (from 02-true-benjamin-franklin-fisher-1899.txt)
The second year his election to the office was opposed; an influential member wanted the place for a friend, and Franklin had a chance to show a philosopher’s skill in practical politics. “Having heard that he had in his library a certain very scarce and curious book, I wrote a note to him, expressing my desire of perusing that book, and requesting he would do me the favour of lending it to me for a few days. He sent it immediately, and I return’d it in about a week with another note, expressing strongly my sense of the favour. When we next met, in the House, he spoke to me (which he had never done before), and with great civility; and he ever after manifested a readiness to serve me on all occasions, so that we became great friends and our friendship continued to his death. This is another instance of the truth of an old maxim I had learned, which says ‘He that has once done you a kindness will be more ready to do you another, than he whom you yourself have obliged.’” (Bigelow’s Franklin from his own Writings, vol. i. p. 260.)

[D4-C0102] (from 04-benjamin-franklin-abbott-1876.txt)
There was in Boston a young man by the name of Collins, a reckless, dissipated spendthrift, of very considerable personal attractions. He had been quite an intimate friend of Franklin; and was so pleased with his descriptions of Philadelphia that he decided to remove there. This proved one of the calamities of Franklin's life. Franklin eventually embarked, in a sloop, for his return. It touched at Newport. His brother John lived there, pursuing the trade of a candle-maker. Benjamin was received by him with great cordiality. At Newport, among the other passengers, two young girls were taken on board for New York. They were showy, voluble, gaudily dressed. All their arts were exerted to secure intimate association with Franklin.

[D3-C0270] (from 03-boyhood-to-manhood-thayer.txt)
"What is that?" "Cocker's Arithmetic." "Begin to wish that you knew something of arithmetic by this time! Making up for misspent time, I see. Paying old debts is not interesting business." James meant this last remark for a fling at Benjamin's dislike for arithmetic when he attended school. Not devoting himself to it with the enthusiasm he gave to more congenial studies, he was more deficient in that branch of knowledge than in any other. He regretted his neglect of the study now, and was determined to make up his loss. This was very honorable, and showed a noble aim, which merited praise, instead of a fling, from his brother. "I think it must be a sort of luxury to pay old debts, if one has any thing to pay them with," remarked Benjamin. "If I can make up any loss of former years now, I enjoy doing it, even by the closest economy of time." "Well, you estimate time as closely as a miser counts his money, Ben."

[D4-C0632] (from 04-benjamin-franklin-abbott-1876.txt)
"I wish to know the opinion of my venerable friend, concerning Jesus of Nazareth. He will not impute this to impertinence; or improper curiosity in one, who, for so many years, has continued to love, esteem and reverence his abilities and literary character, with an ardor and affection bordering on adoration." What Dr. Stiles, and the community in general, wished to know was, whether Dr. Franklin recognized the Divine, supernatural origin of Christianity. Franklin evaded the question. This evasion of course indicates that he did not recognize, in the religion of Jesus, the authority of, "Thus saith the Lord." But he wished to avoid wounding the feelings of his Christian friends by this avowal. He wrote,

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "The three most intimate companions of Benjamin Franklin were young clerks of his own rank and age, including Joseph Watson, who was described as a pious and sensible young man of great integrity.",
      "chunk_ids": [
        "D4-C0112"
      ]
    },
    {
      "text": "Another intimate friend of Franklin was a young man named Collins, who was a reckless and dissipated spendthrift.",
      "chunk_ids": [
        "D4-C0102"
      ]
    },
    {
      "text": "Additionally, Franklin sought the advice of Mr. Denham, a Quaker merchant who showed him many favors and became deeply interested in him.",
      "chunk_ids": [
        "D3-C0673"
      ]
    },
    {
      "text": "He was also influenced by the preaching of his friend Mr. Whitefield, and he had Christian friends whose feelings he wished to avoid wounding.",
      "chunk_ids": [
        "D4-C0279",
        "D4-C0632"
      ]
    }
  ]
}
```
</details>

### Q15. Who were Benjamin Franklin's rivals or enemies?

**Status:** answered

**Search phrasings:** “Who were Benjamin Franklin's rivals or enemies?” · “Benjamin Franklin's enemies and rivals who attacked and opposed” · “a bitter quarrel, dispute or hostility with an opponent of Benjamin Franklin”

**Retrieval gate:** best cosine 0.636 (min 0.3), best BM25 8.728 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0371 | 0.572 | 0.2738 | 8.321 | Thus all the partisans of the Penns, and all the office holders of the crown and their fri… |
| 2 | D2-C0031 | 0.5377 | 0.2858 | 8.728 | He seems to have been totally without either irritability or excitability. In this he was … |
| 3 | D4-C0478 | 0.5893 | 0.302 | 5.281 | Repeated interviews ensued, between Franklin and both the friends and the enemies of the A… |
| 4 | D6-C0109 | 0.5565 | 0.2765 | 4.97 | The governor, a nephew of the proprietaries, came, as all men did, to Franklin in his perp… |
| 5 | D6-C0100 | 0.5723 | 0.2812 | 5.151 | Franklin, too, had his fears, and even went so far as to caution Braddock against the ambu… |
| 6 | D4-C0111 | 0.604 | 0.2789 | 0 | At length, Collins and Franklin became so antagonistic to each other as to proceed to viol… |
| 7 | D6-C0096 | 0.636 | 0.3177 | 0 | Franklin's reply, which he was fond of quoting in after life, shows the sturdy nature of t… |
| 8 | D4-C0606 | 0.5745 | 0.2745 | 0 | Such were the colleagues united with Franklin, in the negotiations for peace. It required … |

**Answer (each sentence checked):**

- The partisans of the Penns, crown office holders, and the Penns themselves were implacable in their hostility toward Franklin. [D4-C0371]
- Mr. Dickinson declared that Franklin was the object of popular dislike in Pennsylvania. [D4-C0371]
- Franklin gained many enemies among the people by his action regarding the Paxton rioters, leading to a strong coalition formed against him by the proprietary party and the distrust of the public. [D6-C0109]
- Additionally, both of his colleagues during peace negotiations regarded him with suspicion and denounced him in letters home. [D4-C0606]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Who were Benjamin Franklin's rivals or enemies?

Source snippets:
[D4-C0371] (from 04-benjamin-franklin-abbott-1876.txt)
Thus all the partisans of the Penns, and all the office holders of the crown and their friends, and there were many such, became not only opposed to Franklin, but implacable in their hostility. The majority of the Assembly was with him. He was chosen Speaker, and then was elected to go again to England, to carry with him to the British Court the remonstrances of the people against "taxation without representation," and their earnest petition to be delivered from the tyranny of the Penns. More unwelcome messages to the British Court and aristocracy, he could not well convey. It was certain that the Penns and their powerful coadjutors, would set many influences in array against him. Mr. Dickinson, in the Assembly, remonstrating against this appointment, declared that there was no man in Pennsylvania who was more the object of popular dislike than Benjamin Franklin.

[D2-C0031] (from 02-true-benjamin-franklin-fisher-1899.txt)
He seems to have been totally without either irritability or excitability. In this he was the reverse of Washington, who was subject to violent outbursts of anger, could swear “like an angel of God,” as one of his officers said, and had a fiery temper to control. Perhaps Franklin’s strong sense of humor saved him from oaths; there are no swearing stories recorded of him; instead of them we have innumerable jokes and witticisms. His anger when aroused was most deliberate, calculating, and judicious. His enemies and opponents he always ridiculed, often, however, with so little malice or sting that I have no doubt they were sometimes compelled to join in the laugh. He never attacked or abused.

[D4-C0478] (from 04-benjamin-franklin-abbott-1876.txt)
Repeated interviews ensued, between Franklin and both the friends and the enemies of the Americans. There were interminable conferences. But the court was implacable in its resolve, to maintain a supreme and exclusive control over the colonies. Every hour of Franklin's time was engrossed. Merchants and manufacturers, Tories and the opposition, lords temporal, and lords spiritual, all called upon him with their several plans. There were many Americans in London, including a large number of Quakers. These crowded the apartment of Franklin. The negotiations were terminated by a debate in the House of Lords, in which the Americans were assailed in the vilest language of insult and abuse which can be coined. Franklin was present. He writes,

[D6-C0109] (from 06-benjamin-franklin-more-1900.txt)
The governor, a nephew of the proprietaries, came, as all men did, to Franklin in his perplexity; he even lodged in Franklin's house, and concerted with him hourly on the means of repelling the invaders. The "Paxton boys" had reached Germantown. The city was in a panic, and there was no time to lose. Franklin first got together a regiment of militia, and then, with three other gentlemen, went out to Germantown to remonstrate with the fanatics. His mission was successful, and the insurrection was quelled; but Franklin himself had gained many enemies by his action. The people were largely in favor of the Paxton rioters; and the governor, now relieved of his immediate fears, made an infamous proclamation setting a price upon Indian scalps. A strong coalition was formed against Franklin; to the enmity of the proprietary party was now added the distrust of the people.

[D6-C0100] (from 06-benjamin-franklin-more-1900.txt)
Franklin, too, had his fears, and even went so far as to caution Braddock against the ambuscades of the Indians. Braddock smiled at his ignorance, and replied: "These savages may indeed be a formidable enemy to your raw American militia, but upon the king's regular and disciplined troops, sir, it is impossible they should make any impression." Franklin tells us he was conscious of the impropriety of disputing with a military man in matters of his profession, and said no more. The story of Braddock's defeat is only too well known; but to Franklin at least the campaign brought some profit. When later he went to England he found that the general's account of his intelligence and generosity had added considerably to his reputation.

[D4-C0111] (from 04-benjamin-franklin-abbott-1876.txt)
At length, Collins and Franklin became so antagonistic to each other as to proceed to violence. They were on a pleasure party in a boat down the river. Collins, as usual, was intoxicated. The wrath of the muscular Benjamin was so aroused, by some act of abuse, that he seized the fellow by the collar and pitched him overboard. Collins was a good swimmer. They therefore kept him in the water till he was nearly drowned. When pretty thoroughly humbled, and upon his most solemn promise of good behavior, he was again taken on board. Seldom after this was a word exchanged between them. Collins, deeply indebted to Franklin, accepted of some business offer at Barbadoes. He sailed for that island, and was never heard of more.

[D6-C0096] (from 06-benjamin-franklin-more-1900.txt)
Franklin's reply, which he was fond of quoting in after life, shows the sturdy nature of the man: "I shall never _ask_, never _refuse_, nor ever RESIGN an office." As it happened, however, he was again chosen unanimously at the next election, and we may suppose that he was keen enough to know with whom he had to deal. The good Quakers would not fight, but they were not always averse to have some one do their fighting for them. We are approaching the tumultuous times of the Seven Years' War, when the sound of cannon was indeed heard round the world, and when the prowess of England's arms added India and Canada to her empire. In 1752 Franklin, who was now a member of the legislature, was sent, together with the speaker of the Assembly, to confer with the Indians of Ohio; and if no important results came from the conference it at least helped to give Franklin an insight into Indian character such as few men possessed.

[D4-C0606] (from 04-benjamin-franklin-abbott-1876.txt)
Such were the colleagues united with Franklin, in the negotiations for peace. It required all his consummate wisdom to be able to guide affairs wisely under such difficult circumstances. It may be doubted whether there was another man in America, who could have surmounted the obstacles over which he triumphed. Both of Franklin's colleagues regarded him with suspicion. They believed that he had been won over to such sympathy with the French, that he would be willing to sacrifice the interests of his own country to please them. They wrote letters home severely denouncing him; and they seemed to stand more in fear of France than of England. "Dr. Franklin," wrote Mr. Adams, "is very staunch against the Tories; more decided, a great deal, upon that point, than Mr. Jay or myself."

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "The partisans of the Penns, crown office holders, and the Penns themselves were implacable in their hostility toward Franklin.",
      "chunk_ids": [
        "D4-C0371"
      ]
    },
    {
      "text": "Mr. Dickinson declared that Franklin was the object of popular dislike in Pennsylvania.",
      "chunk_ids": [
        "D4-C0371"
      ]
    },
    {
      "text": "Franklin gained many enemies among the people by his action regarding the Paxton rioters, leading to a strong coalition formed against him by the proprietary party and the distrust of the public.",
      "chunk_ids": [
        "D6-C0109"
      ]
    },
    {
      "text": "Additionally, both of his colleagues during peace negotiations regarded him with suspicion and denounced him in letters home.",
      "chunk_ids": [
        "D4-C0606"
      ]
    }
  ]
}
```
</details>

### Q16. What is Benjamin Franklin best known for?

**Status:** answered

**Search phrasings:** “What is Benjamin Franklin best known for?” · “Benjamin Franklin is best known and famous for” · “the greatest achievement, fame and reputation of Benjamin Franklin”

**Retrieval gate:** best cosine 0.6996 (min 0.3), best BM25 10.504 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0279 | 0.6048 | 0.3519 | 8.507 | Franklin was best loved where he was best known. And this was right; for he was ever confe… |
| 2 | D3-C0855 | 0.6996 | 0.4272 | 10.504 | Franklin was forty-two years old at this time; and it is a singular fact that his career a… |
| 3 | D6-C0139 | 0.5797 | 0.3017 | 7.169 | After a brief interval M. de Chaumont, one of the wealthy Frenchmen of the day, offered Fr… |
| 4 | D2-C0377 | 0.6107 | 0.3794 | 6.475 | After he had proved in such a brilliant manner that lightning was merely one of the forms … |
| 5 | D2-C0760 | 0.5768 | 0.2682 | 6.808 | [Illustration: FRANKLIN’S GRAVE IN CHRIST CHURCH GRAVEYARD, PHILADELPHIA] This was Frankli… |
| 6 | D4-C0267 | 0.6283 | 0.3282 | 0 | Franklin, on this journey, was deeply impressed with the importance of a union of the colo… |
| 7 | D4-C0241 | 0.6472 | 0.334 | 0 | There is great moral power in prosperity, when wisely accepted and enjoyed. Franklin was n… |
| 8 | D2-C0373 | 0.5858 | 0.3041 | 6.16 | But it was Franklin’s good fortune on a number of occasions to be placed in picturesque an… |

**Answer (each sentence checked):**

- Benjamin Franklin is best known for his discovery of the nature of lightning through his kite experiment, which established his fame as the greatest electrician of the world. [D3-C0855]
- His discovery of the nature of lightning and his invention of the lightning-rod earned him a great deal of popular applause. [D2-C0377]
- To this day, kite-flying remains the popular way of illustrating his discovery and is what most people know of his contributions to science. [D2-C0373]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: What is Benjamin Franklin best known for?

Source snippets:
[D4-C0279] (from 04-benjamin-franklin-abbott-1876.txt)
Franklin was best loved where he was best known. And this was right; for he was ever conferring deeds of kindness upon his neighbors. His religious views excited sorrow among his Christian friends. Others, composing perhaps a majority, cared nothing about what he believed. In conversation he ever frankly avowed himself a deist, though generally he made no attempt to convert others to his views. It is not improbable that he was in some degree influenced by the beneficial effect produced upon the popular mind by the preaching of his friend Mr. Whitefield.

[D3-C0855] (from 03-boyhood-to-manhood-thayer.txt)
Franklin was forty-two years old at this time; and it is a singular fact that his career as a philosopher did not begin really until he had passed his fortieth birthday. But from the time he was released from the care of the printing office, his advancement in science was rapid. His fame spread abroad, both in this country and Europe, so that, in a few years, he became one of the most renowned philosophers in the world. In a former chapter we described his experiment with a kite, to prove that lightning and the electric fluid are identical; and this discovery established his fame as the greatest electrician of the world. The Royal Society of London elected him a member by a unanimous vote, and the next year bestowed upon him the Copley medal. Yale College conferred upon him the degree of Master of Arts; and Harvard University did the same. Suddenly Franklin found himself the most conspicuous character in American history--a philosopher of the most honored type.

[D6-C0139] (from 06-benjamin-franklin-more-1900.txt)
After a brief interval M. de Chaumont, one of the wealthy Frenchmen of the day, offered Franklin rooms at Passy in his Hôtel de Valentinois, and there our philosopher fixed his abode, living in some style, and spending perhaps about thirteen thousand dollars a year. His popularity was immediate and almost unexampled. The great people of France--philosophers, statesmen, titled noblemen, and fine ladies--thought it an honor to receive the famous American; and it is said that so great was his fame among the common people that the shopkeepers would run to their doors to see him pass down the street. Innumerable pictures were drawn and medallions cut of his figure, until, as he wrote, his countenance was made "as well known as that of the moon, so that he durst not do anything that would oblige him to run away, as his phiz would discover him wherever he should venture to show it."

[D2-C0377] (from 02-true-benjamin-franklin-fisher-1899.txt)
After he had proved in such a brilliant manner that lightning was merely one of the forms or phenomena of that mysterious fire which appears when we rub a glass tube with buckskin, Franklin made no more discoveries in science; but his interest and patience of research were unabated. He cannot be ranked among the great men of science, the Newtons and Keplers, or the Humboldts, Huxleys, or Darwins. He belongs rather in the second class, among the minor discoverers. But his discovery of the nature of lightning was so striking and so capable of arousing the wonder of the masses of mankind, and his invention of the lightning-rod was regarded as so universally valuable, that he has received more popular applause than men whose achievements were greater and more important.

[D2-C0760] (from 02-true-benjamin-franklin-fisher-1899.txt)
[Illustration: FRANKLIN’S GRAVE IN CHRIST CHURCH GRAVEYARD, PHILADELPHIA] This was Franklin’s greatest and most permanent service to his country, more valuable than his work in England or France, and a fitting close to his long life. The most active period of his life, as he has told us, was between his seventieth and eighty-second years. How much can be done in eighty vigorous years, and what labors had he performed and what pleasures and vast experiences enjoyed in that time! Few men do their best work at such a great age. Moses, however, we are told, was eighty years old before he began his life’s greatest work of leading the children of Israel out of Egypt. But it would be difficult to find any other instances in history except Franklin.

[D4-C0267] (from 04-benjamin-franklin-abbott-1876.txt)
Franklin, on this journey, was deeply impressed with the importance of a union of the colonies for self-defence. He therefore drew up a plan for such union. Several gentlemen of the highest intelligence in New York, having examined it, gave it their cordial approval. He accordingly laid it before Congress. There were several other persons in other colonies who were impressed as deeply as Franklin with a sense of the importance of such a confederacy, and they also sent in their suggestions.

[D4-C0241] (from 04-benjamin-franklin-abbott-1876.txt)
There is great moral power in prosperity, when wisely accepted and enjoyed. Franklin was now a prosperous man. His income was constantly increasing. His virtues, and they were great ones, proved in all respects promotive of his worldly welfare. His journal was the leading paper, certainly in all that region, and had not its superior in any of the colonies. His renowned almanac, Poor Richard, attained an unexampled sale. The work executed in his printing office was so excellent as to bring in to him many orders even from the other provinces. The various books and pamphlets he had published had all been successful. Philadelphia had already become the chief town of the Colonies.

[D2-C0373] (from 02-true-benjamin-franklin-fisher-1899.txt)
But it was Franklin’s good fortune on a number of occasions to be placed in picturesque and striking situations, which greatly increased his fame. He did not foresee that kite-flying would be one of these, and as it was not essential to his discovery of the nature of lightning, he was disinclined at first to think much of it, and did not even report it to Mr. Collinson until after several months had elapsed. But the world fixed upon it instantly as something easy to remember. To this day it is the popular way of illustrating Franklin’s discovery, and is all that most people know of his contributions to science.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin is best known for his discovery of the nature of lightning through his kite experiment, which established his fame as the greatest electrician of the world.",
      "chunk_ids": [
        "D3-C0855"
      ]
    },
    {
      "text": "His discovery of the nature of lightning and his invention of the lightning-rod earned him a great deal of popular applause.",
      "chunk_ids": [
        "D2-C0377"
      ]
    },
    {
      "text": "To this day, kite-flying remains the popular way of illustrating his discovery and is what most people know of his contributions to science.",
      "chunk_ids": [
        "D2-C0373"
      ]
    }
  ]
}
```
</details>

### Q17. Something Benjamin Franklin made, invented or discovered.

**Status:** answered

**Search phrasings:** “Something Benjamin Franklin made, invented or discovered.” · “Benjamin Franklin invented, an invention” · “Benjamin Franklin discovered by experiment, a discovery, contrived or devised a new”

**Retrieval gate:** best cosine 0.6348 (min 0.3), best BM25 15.364 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0363 | 0.5181 | 0.3077 | 9.521 | Franklin was by no means alone in his studies. Besides the crowds who were interested from… |
| 2 | D2-C0389 | 0.6348 | 0.3945 | 10.529 | He invented a stove that would consume its own smoke, taking the principle from a Frenchma… |
| 3 | D3-C0216 | 0.5127 | 0.3684 | 15.364 | "I believe that I can double my speed in swimming by an invention I have in mind," he said… |
| 4 | D2-C0353 | 0.4341 | 0.3638 | 7.159 | David Rittenhouse invented the metallic thermometer, developed the construction of the com… |
| 5 | D6-C0080 | 0.6044 | 0.3991 | 12.299 | But his discoveries in electricity quite overshadow all his other work of the sort, and on… |
| 6 | D2-C0364 | 0.5626 | 0.3771 | 7.154 | The experiments and the letters to Collinson describing them continued, and about this tim… |
| 7 | D2-C0367 | 0.567 | 0.3984 | 11.806 | Two years before these experiments were inaugurated he had retired from business for vario… |
| 8 | D1-C0294 | 0.4156 | 0.2589 | 12.091 | In order of time, I should have mentioned before, that having, in 1742, invented an open s… |

**Answer (each sentence checked):**

- Franklin discovered and described what is now known as positive and negative electricity. [D2-C0363]
- He also invented a stove that would consume its own smoke. [D2-C0389]
- Franklin announced the invention of the lightning-rod. [D2-C0364]
- In 1742, he invented an open stove for better warming rooms while saving fuel. [D1-C0294]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Something Benjamin Franklin made, invented or discovered.

Source snippets:
[D2-C0363] (from 02-true-benjamin-franklin-fisher-1899.txt)
Franklin was by no means alone in his studies. Besides the crowds who were interested from mere curiosity, there were three men--Ebenezer Kinnersley, Thomas Hopkinson, and Philip Syng--who experimented with him, and it was no mere amateurish work in which these men were engaged. Franklin was their spokesman and reported the results of his and their labor by means of letters to Mr. Peter Collinson. Within six months Hopkinson had observed the power of points to throw off electricity, or electrical fire, as he called it, and Franklin had discovered and described what is now known as positive and negative electricity. Within the same time Syng had invented an electrical machine, consisting of a sphere revolved on an axis with a handle, which was better adapted for producing the electrical spark than the tube-rubbing practised in Europe.

[D2-C0389] (from 02-true-benjamin-franklin-fisher-1899.txt)
He invented a stove that would consume its own smoke, taking the principle from a Frenchman who had shown how the flame of a burning substance could be made to draw downward through the fuel, so that the smoke was burnt with the fuel. But the way in which this invention is usually described would lead one to suppose that it was entirely original with Franklin. He was much interested in agriculture, and was an earnest advocate of mineral manures, encouraged grape culture, and helped to introduce the basket willow and broom-corn into the United States. He at one time owned a farm of three hundred acres near Burlington, New Jersey, where he tried agricultural experiments. He dabbled in medicine, as has been shown, and also wasted time over that ancient delusion, phonetic spelling.

[D3-C0216] (from 03-boyhood-to-manhood-thayer.txt)
"I believe that I can double my speed in swimming by an invention I have in mind," he said to John Collins, one day. "What sort of an invention? You are always up to something of that sort. I think that arms and legs are all the invention that will ever promote swimming, slow or fast." "Well, you see, John, if I do not invent something to greatly increase speed in swimming," continued Benjamin. "I have been studying on it for some time, and I think I have it." "You do not need anything to increase your speed, Ben; you can beat everybody now, and you ought to be satisfied with that." "I am not satisfied. I want to do better yet. I never did so well in anything yet that I did not want to do better."

[D2-C0353] (from 02-true-benjamin-franklin-fisher-1899.txt)
David Rittenhouse invented the metallic thermometer, developed the construction of the compensation pendulum, and made valuable experiments on the compressibility of water. He became a famous astronomer, constructed an orrery to show the movements of the stars which was an improvement on all its predecessors, and conducted the observations of the transit of Venus in 1769. Pennsylvania was the only one of the colonies that took these observations, which in that year were taken by all the European governments in various parts of the world. The Legislature and public institutions, together with a large number of individuals, assisted in the undertaking, showing what very favorable conditions for science prevailed in the province.[18]

[D6-C0080] (from 06-benjamin-franklin-more-1900.txt)
But his discoveries in electricity quite overshadow all his other work of the sort, and on them must rest his real claim to scientific renown. For many years the world had been amusing itself with various machines for making sparks and giving shocks, and after the discovery of the Leyden jar, in 1745, the manipulation of electrical toys and machines became the rage among scientists and even among the people of society. Just about this time a friend in England sent Franklin specimens of the glass tubes used to create electricity by friction, and immediately Franklin's inquisitive mind was fired to take up the new study. So fully indeed was his attention engrossed by the series of experiments he now undertook, alone and with several investigating friends in the city, that business became irksome to him and he retired from active management of the printing house. Besides making many ingenious toys and showy experiments, Franklin added three contributions of real importance to science.

[D2-C0364] (from 02-true-benjamin-franklin-fisher-1899.txt)
The experiments and the letters to Collinson describing them continued, and about this time we find Franklin writing a long and apparently the first intelligent explanation of the action of the Leyden jar. Then followed attempts to explain thunder and lightning as phenomena of electricity, and on July 29, 1750, Franklin sent to Collinson a paper announcing the invention of the lightning-rod, together with an explanation of its action.

[D2-C0367] (from 02-true-benjamin-franklin-fisher-1899.txt)
Two years before these experiments were inaugurated he had retired from business for various reasons, chief among which was his strong desire to devote more time to science. His letters continue to be filled with closely reasoned details of all sorts of experiments. So earnest were these Philadelphia investigators, that when Kinnersley wrote complaining that in travelling to Boston he found difficulty in keeping up his experiments, Franklin, in reply, suggested a portable electrical apparatus which would not break on a journey. In a letter written to Collinson on October 19, 1752, Franklin says he had heard of the success in France of the experiment he had suggested for drawing the lightning from clouds by means of an elevated metal rod; but in the mean time he had contrived another method for accomplishing the same result without the aid of a steeple or lofty iron rod. This was the kite experiment of which we have heard so much, and he goes on to describe it:

[D1-C0294] (from 01-autobiography-franklin.txt)
In order of time, I should have mentioned before, that having, in 1742, invented an open stove for the better warming of rooms, and at the same time saving fuel, as the fresh air admitted was warmed in entering, I made a present of the model to Mr. Robert Grace, one of my early friends, who, having an iron-furnace, found the casting of the plates for these stoves a profitable thing, as they were growing in demand. To promote that demand, I wrote and published a pamphlet, entitled "An Account of the new-invented Pennsylvania Fireplaces; wherein their Construction and Manner of Operation is particularly explained; their Advantages above every other Method of warming Rooms demonstrated; and all Objections that have been raised against the Use of them answered and obviated," etc. This pamphlet had a good effect. Gov'r. Thomas was so pleas'd with the construction of this stove, as described in it, that he offered to give me a patent for the sole vending of them for a term of years; but I declin'd it from a principle which has ever weighed with me on such occasions, viz., That, as we enjoy great advantages from the inventions of others, we should be glad of an opportunity to serve others by any invention of ours; and this we should do freely and generously.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Franklin discovered and described what is now known as positive and negative electricity.",
      "chunk_ids": [
        "D2-C0363"
      ]
    },
    {
      "text": "He also invented a stove that would consume its own smoke.",
      "chunk_ids": [
        "D2-C0389"
      ]
    },
    {
      "text": "Franklin announced the invention of the lightning-rod.",
      "chunk_ids": [
        "D2-C0364"
      ]
    },
    {
      "text": "In 1742, he invented an open stove for better warming rooms while saving fuel.",
      "chunk_ids": [
        "D1-C0294"
      ]
    }
  ]
}
```
</details>

### Q18. Where did Benjamin Franklin travel or live?

**Status:** answered

**Search phrasings:** “Where did Benjamin Franklin travel or live?” · “places where Benjamin Franklin lived and resided, moved to the city” · “Benjamin Franklin travelled abroad, a voyage to another country, returned home”

**Retrieval gate:** best cosine 0.6938 (min 0.3), best BM25 14.229 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0487 | 0.6362 | 0.3606 | 13.092 | "It is a good town, and has many educated, intelligent citizens; it is a thriving place," … |
| 2 | D3-C0733 | 0.6429 | 0.3588 | 13.961 | [3] "Life and Times of Benjamin Franklin," vol. i. p. 136. XXIX. UPS AND DOWNS OF LIFE. On… |
| 3 | D6-C0044 | 0.5856 | 0.3016 | 14.229 | It was time for Franklin to come home and prepare for the great work before him. He was in… |
| 4 | D4-C0489 | 0.6179 | 0.4203 | 10.92 | The voyage across the Atlantic occupied six weeks. In the evening twilight of the 5th of M… |
| 5 | D4-C0077 | 0.656 | 0.3912 | 5.442 | It was late in the afternoon when they reached the port. For thirty hours they had been wi… |
| 6 | D6-C0007 | 0.6938 | 0.3785 | 7.946 | But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence.… |
| 7 | D4-C0351 | 0.6818 | 0.4478 | 0 | His business detained Franklin in London all summer. In the autumn he took a tour into the… |
| 8 | D5-C0228 | 0.6227 | 0.4072 | 9.247 | 10. When the independence of the United States was acknowledged by Great Britain, Franklin… |

**Answer (each sentence checked):**

- Benjamin Franklin was born in Boston, where his family's home was located in Milk Street and later on Hanover and Union streets. [D6-C0007]
- He traveled from New York to Philadelphia, passing through New Jersey and Burlington. [D4-C0077]
- He also spent time living and traveling in places such as London, the west of England, and Wales. [D4-C0351] (warn)
  - low_overlap: only 44% of content words appear in cited chunks
- Additionally, he returned to Philadelphia after a voyage across the Atlantic. [D4-C0489, D5-C0228]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Where did Benjamin Franklin travel or live?

Source snippets:
[D3-C0487] (from 03-boyhood-to-manhood-thayer.txt)
"It is a good town, and has many educated, intelligent citizens; it is a thriving place," said Benjamin. "I should like to see as much of the world as you have." "I enjoyed it, though my knocking about subjected me to many hardships," replied the doctor. "You would like to see London, and Paris, and Rome; I have seen them all. They are marvellous cities." "I suppose so. My father came from England to Boston less than forty years ago," continued Benjamin. "He enjoys this country more than he did his own." Benjamin had a good time at Doctor Brown's. The latter soon discovered that his youthful guest was very intelligent, so he entered into an account of his travels abroad somewhat in detail to interest him. Benjamin enjoyed the interview very much, and forgot, for the time being, that he was a runaway encountering many hardships. He was sorry to leave him on the next day.

[D3-C0733] (from 03-boyhood-to-manhood-thayer.txt)
[3] "Life and Times of Benjamin Franklin," vol. i. p. 136. XXIX. UPS AND DOWNS OF LIFE. One of the first places that Benjamin visited was the printing house of Keimer, where he worked before leaving the country. Keimer had made up his mind that Benjamin would never return to America, so that when he entered the printing office he was startled. "Why, Ben! can it be you?" he exclaimed in wonder. "I began to think that you would never be seen in Philadelphia again." "Why did you think so?" "Because you planned to be back here a long time ago; I concluded that you had forsaken us." "Not yet; I have seen no place abroad quite equal to Philadelphia. I did not return as soon as I expected." And Benjamin rehearsed to Keimer substantially his experience with Governor Keith, that he might understand why his return was delayed.

[D6-C0044] (from 06-benjamin-franklin-more-1900.txt)
It was time for Franklin to come home and prepare for the great work before him. He was indeed ready to come when his skill in swimming almost lost him to this country. He had made such an impression by his feats in the water that one of his friends and pupils in the art proposed they should travel over Europe together, and support themselves by giving exhibitions. Fortunately Mr. Denham, an older and wiser friend, persuaded Franklin to return with him to America. III RELIGIOUS BELIEFS.--THE JUNTO

[D4-C0489] (from 04-benjamin-franklin-abbott-1876.txt)
The voyage across the Atlantic occupied six weeks. In the evening twilight of the 5th of May, the ship dropped anchor in the Delaware, opposite Philadelphia. Franklin landed, and walked alone through the darkened streets towards his home. It is difficult to imagine the emotions with which his heart must have been agitated in that hour. Ten years had elapsed since he left his home. In the meantime his wife had reared another dwelling, in Market street, and there she had died. He had left his daughter Sarah, a child of twelve years. He was to find her a matron surrounded by her babes.

[D4-C0077] (from 04-benjamin-franklin-abbott-1876.txt)
It was late in the afternoon when they reached the port. For thirty hours they had been without food or water. Such were the perils of a passage from New York to Philadelphia in the year 1723. Franklin, in the enjoyment of magnificent health, slept quietly that night in an humble inn, and awoke in the morning with all his accustomed vigor. There were still fifty miles of land travel before him, ere he could cross the forest covered plains of New Jersey to Burlington, on the banks of the Delaware, which were seventeen miles above Philadelphia. There was neither railroad, stage-coach nor cart to convey him through the wilderness. Indeed it was thirty-three years after this before the first line of stages across New Jersey was established. There was a rude path, probably following an ancient Indian trail, along which our solitary adventurer trudged on foot. It rained; but still Benjamin found it necessary, having so slender a purse, to press on regardless of discomfort.

[D6-C0007] (from 06-benjamin-franklin-more-1900.txt)
But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence. Benjamin Franklin was born in Boston, January 6 (old style), 1706. At that time the family home was in Milk Street, opposite the Old South Church, to which sacred edifice the child was taken the day of his birth, tradition asserting that his own mother carried him thither through the snow. Shortly afterwards the family moved to a wooden house on the corner of Hanover and Union streets.

[D4-C0351] (from 04-benjamin-franklin-abbott-1876.txt)
His business detained Franklin in London all summer. In the autumn he took a tour into the west of England and Wales. The gales of winter were now sweeping the Atlantic. No man in his senses would expose himself to a winter passage across the ocean, unless it was absolutely necessary. Indeed it would appear that Franklin was so happy in England, that he was not very impatient to see his home again. Though he had been absent three years from his wife and child, still two years more elapsed before he embarked for his native land.

[D5-C0228] (from 05-life-of-franklin-goodrich.txt)
10. When the independence of the United States was acknowledged by Great Britain, Franklin became desirous of returning home. The infirmities of age and disease had fallen upon him, and the situation of his country rendered his services no longer indispensably necessary. He applied to congress to be recalled, and Mr. Jefferson was appointed to succeed him in 1785. In September of the same year, Franklin arrived in Philadelphia. He was shortly after chosen a member of the supreme council for the city, and was soon elected president of the same body.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin was born in Boston, where his family's home was located in Milk Street and later on Hanover and Union streets.",
      "chunk_ids": [
        "D6-C0007"
      ]
    },
    {
      "text": "He traveled from New York to Philadelphia, passing through New Jersey and Burlington.",
      "chunk_ids": [
        "D4-C0077"
      ]
    },
    {
      "text": "He also spent time living and traveling in places such as London, the west of England, and Wales.",
      "chunk_ids": [
        "D4-C0351"
      ]
    },
    {
      "text": "Additionally, he returned to Philadelphia after a voyage across the Atlantic.",
      "chunk_ids": [
        "D4-C0489",
        "D5-C0228"
      ]
    }
  ]
}
```
</details>

### Q19. A habit, hobby or quirk of Benjamin Franklin.

**Status:** answered

**Search phrasings:** “A habit, hobby or quirk of Benjamin Franklin.” · “a habit, daily routine or custom of Benjamin Franklin” · “a hobby, pastime, peculiar quirk; Benjamin Franklin was fond of”

**Retrieval gate:** best cosine 0.6798 (min 0.3), best BM25 7.345 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0195 | 0.6798 | 0.4196 | 6.454 | The habit of punctuality which Franklin formed in his youth, distinguished him in his manh… |
| 2 | D3-C0192 | 0.5862 | 0.3422 | 7.345 | The habit of reading that Benjamin had formed tended to make him punctual. In order to com… |
| 3 | D5-C0239 | 0.4025 | 0.2895 | 4.924 | , and enjoy all with cheerfulness. Those who are to be unhappy, think and speak only of th… |
| 4 | D2-C0084 | 0.6024 | 0.2674 | 5.575 | He had an intimate friend, John Collins, likewise inclined to books, and the two argued an… |
| 5 | D3-C0306 | 0.5541 | 0.2346 | 7.128 | It was probably as true of Benjamin Franklin as it was of Thomas Hood, that reading saved … |
| 6 | D3-C0212 | 0.5724 | 0.3243 | 5.509 | The temperate habits which Benjamin formed in his youth were the more remarkable because t… |
| 7 | D3-C0136 | 0.6237 | 0.2993 | 6.371 | Mr. Franklin saw from month to month that his son more and more disliked his business, tho… |
| 8 | D3-C0145 | 0.6038 | 0.3216 | 0 | Mr. Franklin had evidently acquired new views about boys, judging from his last remarks. H… |

**Answer (each sentence checked):**

- Benjamin Franklin formed a habit of punctuality in his youth that distinguished him in manhood and made him reliable in the printing office. [D3-C0195, D3-C0192]
- He also had a passionate fondness for reading from his infancy and spent all his money on books. [D3-C0306]
- Additionally, he formed temperate habits in his youth and was fond of wordy contention when he was younger, though he later viewed this disputatious turn as a bad habit. [D2-C0084, D3-C0212]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: A habit, hobby or quirk of Benjamin Franklin.

Source snippets:
[D3-C0195] (from 03-boyhood-to-manhood-thayer.txt)
The habit of punctuality which Franklin formed in his youth, distinguished him in his manhood as much as the same habit did Washington. There is no doubt that it exerted a large influence in placing him next to Washington among the founders of our republic. One of the maxims that he wrote in mature life was: "He that riseth late must trot all day, and shall scarce overtake his business at night." IX. TABLE-TALK EDUCATION. We delay the narrative, at this point, to introduce a subject that Franklin often referred to as influencing his early life. In his "Autobiography," he said:

[D3-C0192] (from 03-boyhood-to-manhood-thayer.txt)
The habit of reading that Benjamin had formed tended to make him punctual. In order to command the more time he was promptly at his work, and efficiently discharged every duty. It was this well-formed habit of punctuality that made him so reliable in the printing office. His brother knew that he would be there at such a time, and that he would remain just so many hours. This habit won his confidence, as it does the confidence of every one. There is no quality that does more to gain a good name for an individual, and inspire the confidence of his fellow-men, than this one of being on time. It is so generally found in company with other excellent traits of character, that it seems to be taken for granted, usually, that the punctual person is worthy in other respects.

[D5-C0239] (from 05-life-of-franklin-goodrich.txt)
, and enjoy all with cheerfulness. Those who are to be unhappy, think and speak only of the contrarieties. Hence they are continually discontented themselves, and, by their remarks, sour the pleasures of society; offend personally many people, and make themselves every where disagreeable. If this turn of mind was founded in nature, such unhappy persons would be the more to be pitied. But as the disposition to criticise, and to be disgusted, is, perhaps, taken up originally by imitation, and is, unawares, grown into a habit, which, though at present strong, may, nevertheless, be cured, when those who have it are convinced of its bad effect on their felicity; I hope this little admonition may be of service to them, and put them on changing a habit which, though in the exercise it is chiefly an act of imagination, yet has serious consequences in life, as it brings on real griefs and misfortunes.

[D2-C0084] (from 02-true-benjamin-franklin-fisher-1899.txt)
He had an intimate friend, John Collins, likewise inclined to books, and the two argued and disputed with each other. Franklin was fond of wordy contention at that time, and it was possibly a good mental training for him. He had caught it, he says, from reading his father’s books of religious controversy. But in after-years he became convinced that this disputatious turn was a very bad habit, which made one extremely disagreeable and alienated friends; he therefore adopted during most of his life a method of cautious modesty.

[D3-C0306] (from 03-boyhood-to-manhood-thayer.txt)
It was probably as true of Benjamin Franklin as it was of Thomas Hood, that reading saved him from a career of worldliness and worthlessness. In his manhood he regarded the habit in this light, and said: "From my infancy I was passionately fond of reading, and all the money that came into my hands was laid out in the purchasing of books." If he had laid out his money in billiards, boating, theatre-going, and kindred pleasures, as so many do, he might have been known in manhood as Ben, the Bruiser, instead of "Ben, the Statesman and Philosopher." The first book Benjamin read was "Bunyan's Pilgrim's Progress." He was fascinated with it, and read it over and over, much to the gratification of his parents. "What is there about it that interests you so much?" inquired his father, hoping that it might be the subject alone. "The dialogues that are carried on in it," replied Benjamin.

[D3-C0212] (from 03-boyhood-to-manhood-thayer.txt)
The temperate habits which Benjamin formed in his youth were the more remarkable because there were no temperance societies at that time, and it was generally supposed to be necessary to use intoxicating drinks. The evils of intemperance were not viewed with so much abhorrence as they are now, and the project of removing them from society was not entertained for a moment. Reformatory movements of this kind did not begin until nearly a century after the time referred to. Yet Benjamin was fully persuaded in his youth that he ought to be temperate in all things. It was a theme of conversation at his father's table and fireside. That conversation instructed him then, as temperance lectures, books, and societies instruct the young now; and it accomplished its purpose. In the sequel we shall learn still more of the moulding power of home lessons, in conversation, to make him the man he became.

[D3-C0136] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin saw from month to month that his son more and more disliked his business, though little was said by either of them. "Actions speak louder than words," as Mr. Franklin saw to his regret; for it was as clear as noonday that Benjamin would never be contented in the candle-factory. He did his best, however, to make the boy's situation attractive; allowed him frequent opportunities for play, and praised his habit of reading in the evening and at all other times possible. Still, a tallow-candle did not attract him. It shed light, but it was not the sort of light that Benjamin wanted to radiate. One day, nearly two years after he engaged in the candle-business, he said to his father: "I wish I could do something else; I can never like this work." "What else would you like to do?" inquired his father.

[D3-C0145] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Franklin had evidently acquired new views about boys, judging from his last remarks. He saw but one way out of the difficulty. Choice of an occupation was a more important matter than he had dreamed of. However, he had acted in accordance with the custom of that day, to choose occupations for sons without the least regard to fitness or their preferences. Boys must not have their own way in that matter any more than they should in other things, was the opinion of that age. But progress has been made on this line. It is thought now that the more nearly the aptitudes of the person fit the occupation, the more congenial and successful is the career. To follow the "natural bent," whenever it is possible, appears to be eminently wise. For square men should be put into square holes and round men into round holes. Failing to regard the drift of one's being in the choice of an occupation, is almost sure to put square men into round holes, and round men into square holes. In this way good mechanics have been spoiled to make poor clergymen or merchants, and a good minister spoiled to make a commonplace artisan.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin formed a habit of punctuality in his youth that distinguished him in manhood and made him reliable in the printing office.",
      "chunk_ids": [
        "D3-C0195",
        "D3-C0192"
      ]
    },
    {
      "text": "He also had a passionate fondness for reading from his infancy and spent all his money on books.",
      "chunk_ids": [
        "D3-C0306"
      ]
    },
    {
      "text": "Additionally, he formed temperate habits in his youth and was fond of wordy contention when he was younger, though he later viewed this disputatious turn as a bad habit.",
      "chunk_ids": [
        "D2-C0084",
        "D3-C0212"
      ]
    }
  ]
}
```
</details>

### Q20. How did Benjamin Franklin die, and how is Benjamin Franklin remembered?

**Status:** answered

**Search phrasings:** “How did Benjamin Franklin die, and how is Benjamin Franklin remembered?” · “the last illness and death of Benjamin Franklin, died” · “the funeral of Benjamin Franklin, how Benjamin Franklin is remembered, epitaph and legacy”

**Retrieval gate:** best cosine 0.658 (min 0.3), best BM25 9.805 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D4-C0639 | 0.658 | 0.4029 | 7.82 | "Jesus can make a dying bed Feel soft as downy pillows are." A few hours before his death,… |
| 2 | D4-C0232 | 0.6441 | 0.4165 | 9.805 | We read the following epitaph on his little grave-stone with much sympathy for the bereave… |
| 3 | D3-C0096 | 0.6237 | 0.3748 | 7.978 | J.F., BORN 1655, DIED 1744, AET. 89. A.F., BORN 1667, DIED 1752, AET. 85." We may say here… |
| 4 | D4-C0249 | 0.5549 | 0.3338 | 9.442 | "Last night died Mr. Josiah Franklin, tallow chandler, and soap maker. By the force of ste… |
| 5 | D4-C0248 | 0.6464 | 0.2866 | 8.743 | "When boys see prizes brought in, and quantities of money shared among the men, and their … |
| 6 | D4-C0463 | 0.5518 | 0.2946 | 7.959 | In December, 1774, she was suddenly stricken down by a paralytic stroke. Five days of unco… |
| 7 | D4-C0115 | 0.5596 | 0.2689 | 7.309 | Joseph Watson died quite young, in the arms of Franklin. Charles Osborne acquired money an… |
| 8 | D4-C0158 | 0.5904 | 0.2307 | 7.02 | "His old friend Collins, he remembered, was a Free-thinker, and Collins had gone astray. R… |

**Answer (each sentence checked):**

- Benjamin Franklin died at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his last words about a dying man not being able to do anything easy. [D4-C0639]
- He is remembered as one of the wisest and best of all the fallen children of Adam, and his memory has been justly cherished with reverence and affection throughout the civilized world from his dying hour to the present day. [D4-C0639]

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: How did Benjamin Franklin die, and how is Benjamin Franklin remembered?

Source snippets:
[D4-C0639] (from 04-benjamin-franklin-abbott-1876.txt)
"Jesus can make a dying bed Feel soft as downy pillows are." A few hours before his death, as some one urged him to change his position, that he might breathe easier he replied, "a dying man can do nothing easy." These were his last words. He then sank into a lethargy, from which he passed into that sleep which has no earthly waking. It was eleven o'clock at night, April 17, 1790. He had lived eighty-four years, three months and eleven days. But no candid and charitable reader can peruse this narrative, without the admission that Benjamin Franklin, notwithstanding his imperfections, was one of the wisest and best of all the fallen children of Adam. From his dying hour to the present day his memory has been justly cherished with reverence and affection, throughout the civilized world. And there is no fear that this verdict will ever be reversed. TRANSCRIBER'S NOTE:

[D4-C0232] (from 04-benjamin-franklin-abbott-1876.txt)
We read the following epitaph on his little grave-stone with much sympathy for the bereaved father. He could only write Francis F. Son of Benjamin and Deborah Franklin. Deceased November 12, 1736, Aged four years, one month and one day. The delight of all who knew him.

[D3-C0096] (from 03-boyhood-to-manhood-thayer.txt)
J.F., BORN 1655, DIED 1744, AET. 89. A.F., BORN 1667, DIED 1752, AET. 85." We may say here that the stone which Doctor Franklin erected, as above, became so dilapidated that in 1827, the citizens of Boston replaced it by a granite obelisk. The bodies repose in the old Granary cemetery, beside Park-street church. * * * * * It was arranged that Benjamin should begin his school-days, and enjoy the best literary advantages which the poverty of his father could provide. He acceded to the plan with hearty good-will, and commenced his studies with such zeal and enthusiasm as few scholars exhibit.

[D4-C0249] (from 04-benjamin-franklin-abbott-1876.txt)
"Last night died Mr. Josiah Franklin, tallow chandler, and soap maker. By the force of steady temperance he had made a constitution, none of the strongest, last with comfort to the age of eighty-nine years. And by an entire dependence on his Redeemer, and a constant course of the strictest piety and virtue, he was enabled to die as he lived, with cheerfulness and peace, leaving a numerous posterity the honor of being descended from a person who, through a long life, supported the character of an honest man."

[D4-C0248] (from 04-benjamin-franklin-abbott-1876.txt)
"When boys see prizes brought in, and quantities of money shared among the men, and their gay living, it fills their heads with notions that half distract them; and puts them quite out of conceit with trades and the dull ways of getting money by working. My only son left my house unknown to us all, and got on board a privateer, from whence I fetched him. No one imagined it was hard usage at home that made him do this. Every one that knows me thinks I am too indulgent a parent, as well as master." The father of Benjamin Franklin died in Boston, at the great age of eighty-nine years. He had secured, in a very high degree, the respect of the people, not only by his irreproachable morals, but by his unfeigned piety. The Boston News Letter, of January 17, 1745, in the following brief obituary, chronicles his death:

[D4-C0463] (from 04-benjamin-franklin-abbott-1876.txt)
In December, 1774, she was suddenly stricken down by a paralytic stroke. Five days of unconscious slumber passed away, when she fell into that deep and dreamless sleep, which has no earthly waking. Her funeral was attended by a large concourse of citizens, with every testimonial of respect. Some of Franklin's oldest friends bore the coffin to the churchyard, where the remains of the affectionate wife and mother who had so nobly fulfilled life's duties, were placed by the side of her father, her mother, and her infant son. Feelingly does Mr. Parton write, "It is mournful to think that for so many years, she should have been deprived of her husband's society. The very qualities which made her so good a wife, rendered it possible for him to remain absent from his affairs." Franklin, all unconscious of the calamity which had darkened his home, and weary of the conflict with the British court, was eagerly making preparations to return to Philadelphia.

[D4-C0115] (from 04-benjamin-franklin-abbott-1876.txt)
Joseph Watson died quite young, in the arms of Franklin. Charles Osborne acquired money and reputation, as a lawyer. Removing to the West Indies, he died, in the prime of life. Franklin and Osborne entered into the agreement, which has so often been made, that whichever should first die, should, if possible, return to the other and reveal to him the secrets of the spirit land. It is hardly necessary to say that Franklin watched long in vain, for a visit from his departed companion. Two months before Franklin sailed for London, Mr. Read, with whom he boarded, died. With the father, mother, and very pretty and amiable daughter, Deborah, Franklin had found a happy home. A strong affection apparently sprang up between the two young people. She was seventeen years of age, and Franklin eighteen. Their union would be eminently fitting, as in fortune and position in society, they were on the same level.

[D4-C0158] (from 04-benjamin-franklin-abbott-1876.txt)
"His old friend Collins, he remembered, was a Free-thinker, and Collins had gone astray. Ralph was a Free-thinker, and Ralph was a great sinner. Keith was a Free-thinker, and Keith was the greatest liar in Pennsylvania. Benjamin Franklin was a Free-thinker, and how shamefully he had behaved to Ralph's mistress, to Mr. Vernon and Miss Read, whose young life had been blighted through him."[10] [Footnote 10: Parton's Life of Franklin, Vol. I, p. 168.]

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "answered",
  "sentences": [
    {
      "text": "Benjamin Franklin died at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his last words about a dying man not being able to do anything easy.",
      "chunk_ids": [
        "D4-C0639"
      ]
    },
    {
      "text": "He is remembered as one of the wisest and best of all the fallen children of Adam, and his memory has been justly cherished with reverence and affection throughout the civilized world from his dying hour to the present day.",
      "chunk_ids": [
        "D4-C0639"
      ]
    }
  ]
}
```
</details>

## Canary logs

### Canary 1. Did Benjamin Franklin invent bifocal spectacles?

**Status:** not in the sources — The LLM found no answer in the retrieved snippets.

**Search phrasings:** “Did Benjamin Franklin invent bifocal spectacles?”

**Retrieval gate:** best cosine 0.5234 (min 0.3), best BM25 7.526 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D3-C0216 | 0.4112 | 0.2253 | 7.011 | "I believe that I can double my speed in swimming by an invention I have in mind," he said… |
| 2 | D2-C0298 | 0.4064 | 0.2257 | 5.978 | Franklin advertised rather extensively his own publications, and the lamp-black, soap, and… |
| 3 | D2-C0389 | 0.5234 | 0.222 | 5.684 | He invented a stove that would consume its own smoke, taking the principle from a Frenchma… |
| 4 | D3-C0034 | 0.4055 | -0.0412 | 7.526 | "In part, perhaps. If Benjamin could go, I should almost feel that I must go; but I suppos… |
| 5 | D2-C0697 | 0.3439 | -0.0101 | 6.916 | A formal account of the _fête_ was prepared by direction of the countess, and copies circu… |
| 6 | D2-C0390 | 0.5157 | 0.368 | 0 | Knowing, as we do, Franklin’s versatility, it is nevertheless somewhat of a surprise to fi… |
| 7 | D3-C0313 | 0.2376 | 0.0097 | 6.597 | Mr. Parton records a singular incident about this Doctor Mather, as follows: "How exceedin… |
| 8 | D4-C0426 | 0.3912 | -0.0373 | 6.892 | _Chorus._ Oh! no! Not so! For honest souls still know Friends and the bottle still bear th… |

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Did Benjamin Franklin invent bifocal spectacles?

Source snippets:
[D3-C0216] (from 03-boyhood-to-manhood-thayer.txt)
"I believe that I can double my speed in swimming by an invention I have in mind," he said to John Collins, one day. "What sort of an invention? You are always up to something of that sort. I think that arms and legs are all the invention that will ever promote swimming, slow or fast." "Well, you see, John, if I do not invent something to greatly increase speed in swimming," continued Benjamin. "I have been studying on it for some time, and I think I have it." "You do not need anything to increase your speed, Ben; you can beat everybody now, and you ought to be satisfied with that." "I am not satisfied. I want to do better yet. I never did so well in anything yet that I did not want to do better."

[D2-C0298] (from 02-true-benjamin-franklin-fisher-1899.txt)
Franklin advertised rather extensively his own publications, and the lamp-black, soap, and “ready money for old rags” which were to be had at his shop, for the reason, doubtless, that, being owner of both the newspaper and the shop, the advertisements cost him nothing. This is the only foundation for the tale of his having originated modern advertising. His advertisements are of the same sort that appeared in other papers, and there is not the slightest suggestion of modern methods in them. Parton also says that Franklin “invented the plan of distinguishing advertisements by means of little pictures which he cut with his own hands.” If he really was the inventor of this plan, it is strange that he allowed his rival Bradford to use it in the _Mercury_ before it was adopted by the _Gazette_. No cuts appear in the advertisements in the _Gazette_ until May 30, 1734; but the _Mercury’s_ advertisements have them in the year 1733.

[D2-C0389] (from 02-true-benjamin-franklin-fisher-1899.txt)
He invented a stove that would consume its own smoke, taking the principle from a Frenchman who had shown how the flame of a burning substance could be made to draw downward through the fuel, so that the smoke was burnt with the fuel. But the way in which this invention is usually described would lead one to suppose that it was entirely original with Franklin. He was much interested in agriculture, and was an earnest advocate of mineral manures, encouraged grape culture, and helped to introduce the basket willow and broom-corn into the United States. He at one time owned a farm of three hundred acres near Burlington, New Jersey, where he tried agricultural experiments. He dabbled in medicine, as has been shown, and also wasted time over that ancient delusion, phonetic spelling.

[D3-C0034] (from 03-boyhood-to-manhood-thayer.txt)
"In part, perhaps. If Benjamin could go, I should almost feel that I must go; but I suppose it is entirely out of the question for him to go." Benjamin was an older brother of Josiah, who went to learn the trade of a dyer of his brother John before Josiah did. The Benjamin Franklin of this volume, our young hero, was named for him. He was a very pious man, who rendered unto God the things that are God's with full as much care as he rendered unto Caesar the things that are Caesar's. He was a very intelligent, bright man, also quite a poet for that day, and he invented a style of short-hand writing that he used in taking down sermons to which he listened. In this way he accumulated several volumes of sermons, which he held as treasures. "I have not spoken with your brother about the matter," replied the neighbor. "I think it would be more difficult for him to arrange to go than for most of us, at least for the present. I intend to speak with him about it."

[D2-C0697] (from 02-true-benjamin-franklin-fisher-1899.txt)
A formal account of the _fête_ was prepared by direction of the countess, and copies circulated in Paris. The victim of it is described as “the venerable sage” who, “with his gray hairs flowing down upon his shoulders, his staff in his hand, the spectacles of wisdom on his nose, was the perfect picture of true philosophy and virtue;” and this sentence is as complete a summary as could be made of what Franklin was to the French people. As soon as he arrived the countess addressed him in verse: “Soul of the heroes and the wise, Oh, Liberty! first gift of the gods. Alas! at too great a distance do we offer our vows. As lovers we offer homage To the mortal who has made citizens happy.” The company walked through the gardens and then sat down to the banquet. At the first glass of wine they rose and sang,-- “Of Benjamin let us celebrate the glory; Let us sing the good he has done to mortals. In America he will have altars; And in Sanoy let us drink to his glory.”

[D2-C0390] (from 02-true-benjamin-franklin-fisher-1899.txt)
Knowing, as we do, Franklin’s versatility, it is nevertheless somewhat of a surprise to find him venturing into the sphere of music. He is said to have been able to play on the harp, the guitar, and the violin, but probably only in a philosopher’s way and not well on any of them. Some people in England had succeeded in constructing a musical instrument made of glasses, the idea being taken from the pleasant sound produced by passing a wet finger round the brim of a drinking-glass. When in England Franklin was so delighted with these instruments that he set about improving them. He had glasses specially moulded of a bell-like shape and ground with great care until each had its proper note. They were placed in a frame in such a way that they could all be set revolving at once by means of a treadle worked by the foot, and as they revolved they were played by the wet fingers pressed on their brims. He gave the name “Armonica” to his instrument, and describes its tones as “incomparably sweet beyond those of any other.” It is said to have been used in public concerts, and it was one of the curiosities at his famous Craven Street lodging-house in London, where he also had a fine electrical apparatus, and took pleasure in showing his English friends the American experiments of which they had heard so much.

[D3-C0313] (from 03-boyhood-to-manhood-thayer.txt)
Mr. Parton records a singular incident about this Doctor Mather, as follows: "How exceedingly strange that such a work as this should have been written by the man who, in 1692, at Salem, when nineteen people were hanged and one was pressed to death for witchcraft, appeared among the crowd, openly exulting in the spectacle! Probably his zeal against the witches was as much the offspring of his benevolence as his 'Essays to do Good.' Concede his theory of witches, and it had been cruelty to man not to hang them. Were they not in league with Satan, the arch-enemy of God and man? Had they not bound themselves by solemn covenant to aid the devil in destroying human souls and afflicting the elect? Cotton Mather had not the slightest doubt of it." When Benjamin had exhausted the home stock of reading, he showed his sound judgment by saying to his father: "I wish I could have 'Burton's Historical Collections'; it would be a great treat to read those books."

[D4-C0426] (from 04-benjamin-franklin-abbott-1876.txt)
_Chorus._ Oh! no! Not so! For honest souls still know Friends and the bottle still bear the bell." "It is well," Mr. Parton writes, "for us, in these days, to consider the spectacle of this large, robust soul, sporting in this simple, homely way. This superb Franklin of ours, who spent some evenings in mere jollity, passed nearly all his days in labor most fruitful of benefit to his country."--_Life of Franklin_, Vol. i, p. 262.] In the latter part of the year 1772, Franklin, in his ever courteous, but decisive language, was conversing with an influential member of Parliament, respecting the violent proceedings of the ministry, in quartering troops upon the citizens of Boston. The member, in reply, said,

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "not_in_sources",
  "sentences": []
}
```
</details>

### Canary 2. Which U.S. banknote carries Benjamin Franklin's portrait today?

**Status:** not in the sources — The LLM found no answer in the retrieved snippets.

**Search phrasings:** “Which U.S. banknote carries Benjamin Franklin's portrait today?”

**Retrieval gate:** best cosine 0.633 (min 0.3), best BM25 10.62 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0055 | 0.5516 | 0.3709 | 10.62 | But the Duplessis portrait, which was painted from life in Paris in 1778, when he was seve… |
| 2 | D2-C0022 | 0.633 | 0.4746 | 9.135 | PORTRAIT OF LOUIS XVI 346 The kings of France at that time usually gave their portrait to … |
| 3 | D2-C0052 | 0.5963 | 0.3947 | 9.141 | This portrait, which is now in Memorial Hall at Harvard University, has been supposed by s… |
| 4 | D2-C0017 | 0.5025 | 0.3035 | 10.166 | JOHN FOXCROFT 105 Reproduced by permission of the Historical Society of Pennsylvania from … |
| 5 | D4-C0207 | 0.4358 | 0.2834 | 9.853 | [Illustration] Mr. Parton, speaking of the portrait which Franklin then had painted in Lon… |
| 6 | D4-C0206 | 0.5473 | 0.3342 | 9.096 | His portrait was taken when he was in London, working as a journeyman printer. Contrary to… |
| 7 | D2-C0018 | 0.5726 | 0.3542 | 6.932 | WILLIAM TEMPLE FRANKLIN 113 Born 1760, died 1823, son of William Franklin, Governor of New… |
| 8 | D2-C0056 | 0.5214 | 0.3134 | 7.328 | [Illustration: THE MARTIN PORTRAIT OF FRANKLIN] Unfortunately, it is impossible to get a g… |

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Which U.S. banknote carries Benjamin Franklin's portrait today?

Source snippets:
[D2-C0055] (from 02-true-benjamin-franklin-fisher-1899.txt)
But the Duplessis portrait, which was painted from life in Paris in 1778, when he was seventy-two, reveals more than any of them. The Sumner portrait is Franklin the youth; the Martin and the Grundmann portraits are Franklin the philosopher and statesman; the Duplessis portrait is Franklin the man. [Illustration: THE MARTIN PORTRAIT OF FRANKLIN]

[D2-C0022] (from 02-true-benjamin-franklin-fisher-1899.txt)
PORTRAIT OF LOUIS XVI 346 The kings of France at that time usually gave their portrait to a foreign ambassador on his return to his country. This one, by Sicardi, which was given to Franklin, was formerly surrounded by two rows of four hundred and eight diamonds, and was probably worth from ten to fifteen thousand dollars. It is now in the possession of Mr. J. May Duane, of Philadelphia, by whose permission it is reproduced. FRANKLIN PORTRAIT IN WEST COLLECTION 350 A pencil drawing with Benjamin West’s name on the back, now the property of Hon. S. W. Pennypacker, of Philadelphia. It is supposed by some authorities to be merely a copy of the bust by Ceracchi; others believe it to be a drawing from life by West. FRANKLIN’S GRAVE IN CHRIST CHURCH GRAVEYARD, PHILADELPHIA 360 The flat stone marks the grave of Franklin and his wife. The larger upright stone is in memory of John Read, Mrs. Franklin’s father, and the smaller one is in memory of Franklin’s son, Francis, who died in infancy.

[D2-C0052] (from 02-true-benjamin-franklin-fisher-1899.txt)
This portrait, which is now in Memorial Hall at Harvard University, has been supposed by some critics not to be a portrait of Franklin at all. How, they ask, could Franklin, who was barely able to earn his living at that time, and whose companions were borrowing a large part of his spare money, afford to have an oil-painting made of himself in such expensive costume? and why is there no mention of this portrait in any of his writings? But, on the other hand, the portrait has the peculiar set expression of the mouth and the long chin which were so characteristic of Franklin; and it would have been entirely possible for him to have borrowed the clothes and had the picture painted cheaply or as a kindness. It is not well painted, need not have been expensive, and, as there were no photographs then, paintings were the only way by which people could give their likenesses to relatives.

[D2-C0017] (from 02-true-benjamin-franklin-fisher-1899.txt)
JOHN FOXCROFT 105 Reproduced by permission of the Historical Society of Pennsylvania from the painting in their possession. It has been supposed by some to be a portrait of Franklin; but it has not the slightest resemblance to his other portraits, and the letter held in the hand is addressed to John Foxcroft. WILLIAM FRANKLIN, ROYAL GOVERNOR OF NEW JERSEY 108 Born 1730, died 1813; son of Benjamin Franklin; was Governor of New Jersey from 1762 to 1776, when he became a Tory. The reproduction is from an etching by Albert Rosenthal of the portrait once temporarily in the Philadelphia Library and owned by Dr. T. Hewson Bache, of Philadelphia. WILLIAM TEMPLE FRANKLIN 113

[D4-C0207] (from 04-benjamin-franklin-abbott-1876.txt)
[Illustration] Mr. Parton, speaking of the portrait which Franklin then had painted in London, says, "The fair, full, smiling face of Franklin is surrounded in this picture by a vast and stiff horse-hair wig; and his well-developed figure shows imposingly in a voluminous and decorated coat that reaches nearly to his heels. Under his left arm he carries his cocked hat. His manly bosom heaves under snowy ruffles, and his extensive wrist-bands are exposed to view by the shortness of his coat sleeves."

[D4-C0206] (from 04-benjamin-franklin-abbott-1876.txt)
His portrait was taken when he was in London, working as a journeyman printer. Contrary to the general impression, Franklin was then, and through all his life, fully conscious of the advantages which dress confers. When surrounded by the homage of the court of Versailles, there was no courtier in those magnificent saloons more attentive to his attire than was Benjamin Franklin. His keen sagacity taught him the advantage of appearing in a dress entirely different from that of the splendid assembly around him, and thus he attracted universal observation. But never did he appear in the presence of these lords and ladies but in a costly garb to which he had devoted much attention. [Illustration] Mr. Parton, speaking of the portrait which Franklin then had painted in London, says,

[D2-C0018] (from 02-true-benjamin-franklin-fisher-1899.txt)
WILLIAM TEMPLE FRANKLIN 113 Born 1760, died 1823, son of William Franklin, Governor of New Jersey. He was brought up principally by his grandfather, for whom he acted as secretary in Paris, during the Revolution, and by whom he was saved from following his father to Toryism. The reproduction is from an etching by Albert Rosenthal of the portrait in the Trumbull Collection, Yale School of Art. MRS. FRANKLIN 116 This reproduction is from the portrait painted by Matthew Pratt, and now in the possession of Rev. F. B. Hodge, of Wilkesbarre, Pennsylvania. MRS. SARAH BACHE 119 This picture is copied from an engraved reproduction which has often appeared in books relating to Franklin; but none of these reproductions are faithful copies of the original painting, which represents an older and less handsome woman, with more rugged features and more resemblance to Franklin. Permission to reproduce the painting could not be secured. FRONT PAGE OF THE FIRST NUMBER OF THE “PENNSYLVANIA GAZETTE” 135

[D2-C0056] (from 02-true-benjamin-franklin-fisher-1899.txt)
[Illustration: THE MARTIN PORTRAIT OF FRANKLIN] Unfortunately, it is impossible to get a good reproduction of the Duplessis portrait, because there is so much detail in it and the coloring and lights and shadows cannot be successfully copied. But any one who will examine the original or any good replicas of it in oil will, I am convinced, see Franklin as he really was. The care in details, the wrinkles, and the color of the skin give us confidence in it as a likeness. The round, strong, but crude form of the boy of twenty has been beaten and changed by time into a hundred qualities and accomplishments, yet the original form is still discernible, and the face looks straight at us: we see the eyes and every line close at hand.

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "not_in_sources",
  "sentences": []
}
```
</details>

### Canary 3. Did Benjamin Franklin serve on the 1784 French royal commission that investigated Franz Mesmer's animal magnetism?

**Status:** not in the sources — The LLM found no answer in the retrieved snippets.

**Search phrasings:** “Did Benjamin Franklin serve on the 1784 French royal commission that investigated Franz Mesmer's animal magnetism?”

**Retrieval gate:** best cosine 0.5247 (min 0.3), best BM25 10.185 (min 6) → passed

**Retrieved chunk IDs:**

| rank | chunk | cosine | centered | BM25 | preview |
|---|---|---|---|---|---|
| 1 | D2-C0707 | 0.5013 | 0.2583 | 9.767 | Franklin made a great mistake in not agreeing with him, for in the suspicious state of peo… |
| 2 | D2-C0386 | 0.4158 | 0.2412 | 9.048 | In the same careful manner he collected all that was known of the effect of oil in stillin… |
| 3 | D4-C0614 | 0.4915 | 0.2499 | 9.678 | "I would advise you, therefore, not to attempt unchaining the tiger, but to burn this piec… |
| 4 | D1-C0397 | 0.5004 | 0.2838 | 6.953 | It was, however, some time before those papers were much taken notice of in England. A cop… |
| 5 | D2-C0709 | 0.3959 | 0.2374 | 9.315 | “Would you break your instruction?” said Franklin. “Yes,” said Jay, “as I break this pipe,… |
| 6 | D2-C0600 | 0.5247 | 0.2185 | 8.472 | He was not a member of the commission which had charge of French affairs, and yet, in the … |
| 7 | D1-C0005 | 0.4496 | 0.1009 | 10.185 | On his arrival in Philadelphia he was chosen a member of the Continental Congress, and in … |
| 8 | D5-C0110 | 0.347 | -0.0076 | 8.939 | 17. The next time they met in the house, the gentleman spoke to Franklin with a great deal… |

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.

USER:
Person: Benjamin Franklin
Question: Did Benjamin Franklin serve on the 1784 French royal commission that investigated Franz Mesmer's animal magnetism?

Source snippets:
[D2-C0707] (from 02-true-benjamin-franklin-fisher-1899.txt)
Franklin made a great mistake in not agreeing with him, for in the suspicious state of people’s minds at that time his conduct in this respect was taken as proof positive of his subserviency to the French court. Jay suspected that Vergennes advised accepting Oswald’s commission so as to prevent a clear admission of independence, and thus keep the United States embroiled with England as long as possible. In order to support his opposition to Jay, Franklin was obliged to talk about his confidence in the French court, its past generosity and friendliness, and also to call attention to the instruction of Congress that the commissioners should do nothing without the knowledge of the French government, and in all final decisions be guided by that government’s advice.

[D2-C0386] (from 02-true-benjamin-franklin-fisher-1899.txt)
In the same careful manner he collected all that was known of the effect of oil in stilling waves by making the surface so smooth and slippery that the wind cannot act on it. So fascinated was he with this investigation that he had a cane made with a little receptacle for oil in the head of it, and when walking in the country in England experimented on every pond he passed. But it would be long to tell of all he wrote on light and heat, the _vis inertiæ_ of matter, magnetism, rainfall, evaporation, and the aurora borealis.

[D4-C0614] (from 04-benjamin-franklin-abbott-1876.txt)
"I would advise you, therefore, not to attempt unchaining the tiger, but to burn this piece before it is seen by any other person; whereby you will save yourself a great deal of mortification, by the enemies it may raise against you, and perhaps a good deal of regret and repentance. If men are so wicked _with religion_, what would they be if _without it_." Franklin testifies to the remarkable courtesy which characterized all the movements of the French minister, during these protracted and delicate negotiations. The definitive treaty was signed on the 3d of September, 1783. It was unanimously ratified by Congress on the 14th of January, 1784. The king of England gave it his signature on the 9th of April. Thus two years and three months passed between the beginning of negotiations and the conclusion of the treaty of peace.

[D1-C0397] (from 01-autobiography-franklin.txt)
It was, however, some time before those papers were much taken notice of in England. A copy of them happening to fall into the hands of the Count de Buffon, a philosopher deservedly of great reputation in France, and, indeed, all over Europe, he prevailed with M. Dalibard to translate them into French, and they were printed at Paris. The publication offended the Abbé Nollet, preceptor in Natural Philosophy to the royal family, and an able experimenter, who had form'd and publish'd a theory of electricity, which then had the general vogue. He could not at first believe that such a work came from America, and said it must have been fabricated by his enemies at Paris, to decry his system. Afterwards, having been assur'd that there really existed such a person as Franklin at Philadelphia, which he had doubted, he wrote and published a volume of Letters, chiefly address'd to me, defending his theory, and denying the verity of my experiments, and of the positions deduc'd from them.

[D2-C0709] (from 02-true-benjamin-franklin-fisher-1899.txt)
“Would you break your instruction?” said Franklin. “Yes,” said Jay, “as I break this pipe,” and he threw the pieces into the fire. Jay’s firmness compelled Oswald to obtain a new commission in the proper form, and while he deserves credit for this and also for his principle, “We must be honest and grateful to our allies, but think for ourselves,” he seems in the light of later evidence to have been mistaken in his deep mistrust of the French court. His opinions have been briefly stated by Adams:

[D2-C0600] (from 02-true-benjamin-franklin-fisher-1899.txt)
He was not a member of the commission which had charge of French affairs, and yet, in the loose way in which all the foreign business of the colonies was being managed, it was perhaps natural that, as an energetic and able man and an American, he should wish to be consulted occasionally by Franklin and Deane. In a certain way he was directly connected with them, for he had to obtain money from them for some of his expenses incurred in attempting to go to Tuscany, and on this subject he quarrelled with Franklin, who thought that he had used too much. He was also obliged to apply to Franklin for certain papers to enable him to make a commercial treaty with Tuscany, and these, he said, Franklin had delayed supplying. He complained further of Franklin’s neglect to answer his letters and obstructing his means of sending information to America.

[D1-C0005] (from 01-autobiography-franklin.txt)
On his arrival in Philadelphia he was chosen a member of the Continental Congress, and in 1777 he was despatched to France as commissioner for the United States. Here he remained till 1785, the favorite of French society; and with such success did he conduct the affairs of his country that when he finally returned he received a place only second to that of Washington as the champion of American independence. He died on April 17, 1790. The first five chapters of the Autobiography were composed in England in 1771, continued in 1784-5, and again in 1788, at which date he brought it down to 1757. After a most extraordinary series of adventures, the original form of the manuscript was finally printed by Mr. John Bigelow, and is here reproduced in recognition of its value as a picture of one of the most notable personalities of Colonial times, and of its acknowledged rank as one of the great autobiographies of the world. BENJAMIN FRANKLIN HIS AUTOBIOGRAPHY 1706-1757

[D5-C0110] (from 05-life-of-franklin-goodrich.txt)
17. The next time they met in the house, the gentleman spoke to Franklin with a great deal of civility. He ever after manifested a readiness to serve him, and they became great friends. "This is another instance," observes Franklin, "of the truth of an old maxim I had learned, which says--'He that has done you a kindness will be more ready to do you another, than he whom you yourself have obliged.' And it shows how much more profitable it is prudently to remove than to resent, return, and continue inimical proceedings." 18. In 1737, Colonel Spotswood, at that time postmaster-general, being dissatisfied with his deputy at Philadelphia, took away his commission, and offered it to Franklin. He accepted it with readiness, and found it of great advantage. Though the salary was small, the office gave him the means of increasing the subscribers to his paper, and in this way increased his advertisements. His paper now began to afford him a very considerable income. * * * * *

Answer the question using only these snippets. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "status": "not_in_sources",
  "sentences": []
}
```
</details>

## Story prompt

<details><summary>Prompt sent (gemini-flash-lite-latest)</summary>

```text
SYSTEM:
You are writing a short life story of a person from verified notes. Each note is a sentence with the snippet IDs that support it, and the snippets themselves are included.
Rules:
1. Use ONLY facts found in the notes and snippets. Add nothing from your own knowledge: no extra dates, names, places, numbers or explanations.
2. Every sentence in the story must carry the snippet IDs that support it, and those IDs must come from the notes. Do not write sentences without IDs: work transitions into sentences that state facts.
3. Topics marked "not in the sources" are left out of the story completely. Do not mention them or guess at them.
4. Tell it as one story in roughly chronological order, in 4 to 8 paragraphs, warm but factual.

USER:
Person: Benjamin Franklin

Verified notes:
Q1. Where and when was Benjamin Franklin born?
- Benjamin Franklin was born in Boston. [D6-C0007]
- According to some records he was born on January 6, 1706 (old style), while another source states he was born on the seventeenth of January, 1706. [D6-C0007, D5-C0010]

Q2. Where were Benjamin Franklin's parents from, and what did they do?
- For many generations, Franklin's ancestors on his father's side lived in the village of Ecton, Northamptonshire, where father and son had been smiths. [D6-C0004]
- His father, Josiah Franklin, was a man of honest industry who lived in Boston, while his mother was Abiah Folger of Nantucket, the daughter of Peter Folger. [D5-C0010, D3-C0057]

Q3. What was Benjamin Franklin's childhood like?
- From early childhood, Benjamin Franklin was celebrated for his physical beauty, athletic vigor, and imperturbable good nature, and was recognized by his companions as their natural leader. [D4-C0026]
- He was the youngest son in a poor family of seventeen children, and at ten years old he was taken from school to work under his father. [D5-C0010, D3-C0135]
- He was passionately fond of reading from childhood and spent all his savings on books. [D6-C0013]

Q4. Who were Benjamin Franklin's siblings?
- Benjamin Franklin had a younger sister named Jane, later Mrs. Mecom. [D2-C0270]
- He also had an older brother named James Franklin, who was a printer. [D1-C0000, D3-C0178]
- He came from a large family of seventeen children, with other brothers and sisters whose specific names are not all individually listed. [D3-C0533, D5-C0010]

Q5. What schooling or training did Benjamin Franklin have?
- At the age of eight, Benjamin Franklin was sent to the grammar school, where he stayed for less than a year. [D6-C0008, D4-C0028]
- He also studied under Mr. George Brownell, who taught penmanship and arithmetic. [D6-C0008, D3-C0107]
- His formal school life was completed at the age of ten when he was taken into his father's shop. [D4-C0028]
- Later, working in a printing office served as a school where he laid the foundation of his learning and fame. [D3-C0299]

Q6. What was Benjamin Franklin's first job?
- Benjamin Franklin selected the employment of a cutler as a trade and entered upon the business for a few days, but the trade was given up because his father was unable to settle the terms of indenture. [D4-C0036]
- He also spent a brief period in Samuel's shop learning the cutler trade, which was different from candle-making. [D3-C0153]
- It was later decided to bind Benjamin as an apprentice to his brother James to learn the trade of a printer. [D4-C0037, D3-C0174]

Q7. An adventurous story from Benjamin Franklin's life.
- In 1723, Benjamin Franklin experienced a perilous and adventurous journey from New York to Philadelphia that involved traveling without food or water for thirty hours, enduring a violent rain, and trudging on foot through a wilderness. [D4-C0077, D5-C0039, D6-C0027]
- During this journey, he was soaked and tired, had a slender purse, and was even suspected of being a runaway servant. [D4-C0077, D5-C0039]

Q8. A scary or dangerous moment Benjamin Franklin faced.
- During a journey, a squall struck Benjamin Franklin's boat, splitting its sail and pitching his fellow passenger overboard, whom Franklin saved by catching him by the hair. [D4-C0076]
- The sudden tempest escalated into a storm that beat upon them all night, leaving them exhausted, drenched, hungry, and in great danger near the shore. [D4-C0076]
- On another occasion, while attempting to give an electrical shock to a paralytic patient, Franklin received the entire charge himself, which knocked him flat and senseless onto the floor. [D4-C0275]

Q9. A funny anecdote about Benjamin Franklin.
- Franklin was known for his strong sense of humor, making witty speeches, writing amusing articles, and telling jokes that helped restore good humor and relieve tension in Congress. [D4-C0481, D4-C0495, D2-C0031]
- One characteristic joke in Congress occurred when he used a witticism to quench an injudicious movement urging the Episcopal clergy to refrain from praying for the king. [D4-C0495]

Q10. A time Benjamin Franklin failed or made a serious mistake.
- Franklin pronounced breaking into his friend Vernon's money and spending it to be the first great error of his life in his autobiography. [D4-C0110]
- He also referred to another incident involving a wharf of stones built from materials meant for a man's cellar as a wrong act. [D3-C0168, D4-C0027]
- Additionally, he mentioned in his autobiography attempting to take liberties with a companion while under no religious restraint as another erratum. [D4-C0139]
- He also made a great mistake by not agreeing with Jay, which was taken as proof of his subserviency to the French court. [D2-C0707]

Q12. Who did Benjamin Franklin marry, and what was that relationship like?
- Benjamin Franklin married Miss Read, also referred to as Deborah, on September 1, 1730. [D6-C0065, D4-C0194]
- Some detractors insisted they were never legally married and only had a common-law marriage, though they intended marriage and regarded themselves as husband and wife. [D2-C0230]
- Franklin did not marry her out of romantic or exalted affection, but she made him a good wife despite her temper not being the serenest. [D2-C0228, D6-C0067]

Q13. What about Benjamin Franklin's children?
- Benjamin Franklin had a daughter named Sarah who married Richard Bache and left numerous descendants, and another daughter who was married to John Foxcroft. [D2-C0244, D6-C0067]
- He also had an illegitimate son named William, whose own son was named William Temple Franklin. [D2-C0244, D4-C0353]
- Franklin and his wife also had a son who died as a child. [D6-C0067]

Q14. Who were Benjamin Franklin's closest friends or mentors?
- The three most intimate companions of Benjamin Franklin were young clerks of his own rank and age, including Joseph Watson, who was described as a pious and sensible young man of great integrity. [D4-C0112]
- Another intimate friend of Franklin was a young man named Collins, who was a reckless and dissipated spendthrift. [D4-C0102]
- Additionally, Franklin sought the advice of Mr. Denham, a Quaker merchant who showed him many favors and became deeply interested in him. [D3-C0673]
- He was also influenced by the preaching of his friend Mr. Whitefield, and he had Christian friends whose feelings he wished to avoid wounding. [D4-C0279, D4-C0632]

Q15. Who were Benjamin Franklin's rivals or enemies?
- The partisans of the Penns, crown office holders, and the Penns themselves were implacable in their hostility toward Franklin. [D4-C0371]
- Mr. Dickinson declared that Franklin was the object of popular dislike in Pennsylvania. [D4-C0371]
- Franklin gained many enemies among the people by his action regarding the Paxton rioters, leading to a strong coalition formed against him by the proprietary party and the distrust of the public. [D6-C0109]
- Additionally, both of his colleagues during peace negotiations regarded him with suspicion and denounced him in letters home. [D4-C0606]

Q16. What is Benjamin Franklin best known for?
- Benjamin Franklin is best known for his discovery of the nature of lightning through his kite experiment, which established his fame as the greatest electrician of the world. [D3-C0855]
- His discovery of the nature of lightning and his invention of the lightning-rod earned him a great deal of popular applause. [D2-C0377]
- To this day, kite-flying remains the popular way of illustrating his discovery and is what most people know of his contributions to science. [D2-C0373]

Q17. Something Benjamin Franklin made, invented or discovered.
- Franklin discovered and described what is now known as positive and negative electricity. [D2-C0363]
- He also invented a stove that would consume its own smoke. [D2-C0389]
- Franklin announced the invention of the lightning-rod. [D2-C0364]
- In 1742, he invented an open stove for better warming rooms while saving fuel. [D1-C0294]

Q18. Where did Benjamin Franklin travel or live?
- Benjamin Franklin was born in Boston, where his family's home was located in Milk Street and later on Hanover and Union streets. [D6-C0007]
- He traveled from New York to Philadelphia, passing through New Jersey and Burlington. [D4-C0077]
- He also spent time living and traveling in places such as London, the west of England, and Wales. [D4-C0351]
- Additionally, he returned to Philadelphia after a voyage across the Atlantic. [D4-C0489, D5-C0228]

Q19. A habit, hobby or quirk of Benjamin Franklin.
- Benjamin Franklin formed a habit of punctuality in his youth that distinguished him in manhood and made him reliable in the printing office. [D3-C0195, D3-C0192]
- He also had a passionate fondness for reading from his infancy and spent all his money on books. [D3-C0306]
- Additionally, he formed temperate habits in his youth and was fond of wordy contention when he was younger, though he later viewed this disputatious turn as a bad habit. [D2-C0084, D3-C0212]

Q20. How did Benjamin Franklin die, and how is Benjamin Franklin remembered?
- Benjamin Franklin died at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his last words about a dying man not being able to do anything easy. [D4-C0639]
- He is remembered as one of the wisest and best of all the fallen children of Adam, and his memory has been justly cherished with reverence and affection throughout the civilized world from his dying hour to the present day. [D4-C0639]

Not in the sources (leave out): Q11 Hardest time

Snippets cited in the notes:
[D6-C0007] But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence. Benjamin Franklin was born in Boston, January 6 (old style), 1706. At that time the family home was in Milk Street, opposite the Old South Church, to which sacred edifice the child was taken the day of his birth, tradition asserting that his own mother carried him thither through the snow. Shortly afterwards the family moved to a wooden house on the corner of Hanover and Union streets.

[D5-C0010] LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

[D6-C0004] Franklin's ancestors were of the sturdy sort that have made the strength of the Anglo-Saxon race. For three hundred years at least his family had lived on a freehold of thirty acres in the village of Ecton, Northamptonshire; and for many generations father and son had been smiths. Parton, in his capital Life of Franklin, has observed that Washington's ancestors lived in the same county, although much higher in the social scale; and it may well have been that more than one of Franklin's ancestors "tightened a rivet in the armor or replaced a shoe upon the horse of a Washington, or doffed his cap to a Washington riding past the ancestral forge." During these long years the family seems to have gathered strength from the soil, as families are wont to do. Seeing how the Franklins, when the fit of emigrating seized upon them, blossomed out momentarily, and then dwindled away, we are reminded of Poor Richard's wise observation,--

[D3-C0057] So young and large a family needed a mother's watch and care, as Josiah Franklin found to his sorrow. The additional burden laid upon him by the death of his wife interfered much with his business, and he saw fresh reasons each day for finding another help-mate as soon as possible. To run his business successfully, and take the whole charge of his family, was more than he could do. In these circumstances he felt justified in marrying again as soon as possible, and, with the aid of interested friends, he made a fortunate choice of Abiah Folger, of Nantucket, a worthy successor of the first Mrs. Franklin. He married her a few months after the death of his first wife. The second Mrs. Franklin became the mother of ten children, which, added to those of the first Mrs. Franklin, constituted a very respectable family of seventeen children, among whom was Benjamin, the fifteenth child. His "Autobiography" says: "Of the seventeen children I remember to have seen thirteen sitting together at the table, who all grew up to years of maturity and were married." Of the second wife it says: "My mother, the second wife of my father, was Abiah Folger, daughter of Peter Folger, one of the first settlers of New England, of whom honorable mention is made by Cotton Mather in his ecclesiastical history of that country, 'as a godly and learned Englishman.'"

[D4-C0026] From early childhood Franklin was celebrated for his physical beauty, his athletic vigor and his imperturbable good nature. His companions invariably recognized him as their natural leader. He was in no respect what would be called a religious boy, but in many things he had a high sense of honor.

[D3-C0135] Mr. Franklin watched his boy in the candle-trade closely, to see whether his dislike for it increased or diminished. His anxiety for him was great. He did not wish to compel him to make candles against an increasing desire to escape from the hardship. He had great sympathy for him, too, in his disappointment at leaving school. And it was a hard lot for such a lover of school and study to give them up forever at ten years of age. No more school after that! Small opportunity, indeed, in comparison with those enjoyed by nearly every boy at the present day! Now they are just beginning to learn at this early age. From ten they can look forward to six, eight, or ten years in school and college.

[D6-C0013] But swimming and boyish play formed a small, though it may be important, part of his education. He was from childhood up "passionately fond of reading," and he was moreover a wise reader, which is still better. Books were not so easy to get in those days; and the good libraries of the country were composed chiefly of great theological volumes in folio on the shelves of the clergymen's studies. But in one way and another Franklin contrived to lay hands on the food he most needed. All the money he could save he devoted to buying books, and he even had recourse to unusual methods of saving for this purpose. When sixteen he chanced to read a treatise commending a vegetable diet, and forthwith he put himself under this regimen, finding he could thus set aside half his board money to increase his library. He also made the acquaintance of the booksellers' apprentices from whom he could borrow books; and often he would read late into the night so as to return the purloined volume early the next morning.

[D2-C0270] Franklin had a younger sister, Jane, a pretty girl, afterwards Mrs. Mecom, of whom he was very fond, and he kept up a correspondence with her all his life, sending presents to her at Boston, helping her son to earn a livelihood, and giving her assistance in her old age. Their letters to each other were most homely and loving, and she took the greatest pride in his increasing fame. His correspondence with his parents was also pleasant and familiar. In one of his letters to his mother he amuses her by accounts of her grandchildren, and at the same time pays a compliment to his sister Jane.

[D1-C0000] The Autobiography of Benjamin Franklin by Benjamin Franklin (Harvard Classics edition, ed. Charles W. Eliot) (Project Gutenberg, public domain) THE AUTOBIOGRAPHY OF BENJAMIN FRANKLIN The Harvard Classics WITH INTRODUCTION AND NOTES EDITED BY CHARLES W ELLIOT LLD P F COLLIER & SON COMPANY NEW YORK 1909 Navigation Letter from Mr. Abel James. Publishes the first number of "Poor Richard's Almanac. Proposes a Plan of Union for the colonies Chief events in Franklin's life. INTRODUCTORY NOTE Benjamin Franklin was born in Milk Street, Boston, on January 6, 1706. His father, Josiah Franklin, was a tallow chandler who married twice, and of his seventeen children Benjamin was the youngest son. His schooling ended at ten, and at twelve he was bound apprentice to his brother James, a printer, who published the "New England Courant." To this journal he became a contributor, and later was for a time its nominal editor.

[D3-C0178] Mr. Franklin added more to the last remarks, in order to remove an objection which Benjamin seemed to have to being bound to his brother; and he was successful. The last objection was removed, and cheerfully and gladly Benjamin consented to become a printer-boy. The following was the form of the indenture of apprenticeship that bound Benjamin to his brother for nine years: "This indenture witnesseth that Benjamin Franklin, son of Josiah Franklin, and of Abiah, his wife, of Boston, in the colony of Massachusetts Bay, with the consent of his parents, doth put himself apprentice to his brother, James Franklin, printer, to learn his art, and with him after the manner of an apprentice from the ---- day of ----, in the year of our Lord, 1718, until he shall have fully completed the twenty-first year of his age. During which term the said apprentice his master faithfully shall or will serve, his secrets keep, his lawful commands everywhere gladly do.

[D3-C0533] "Got brothers and sisters?" "Plenty of them. I am the fifteenth child, and have two sisters younger than I am; only one of the whole number is dead." "You surprise me; yours must have been the largest family in Boston," continued Mr. Read. "I am sure we have no family as large as that in Philadelphia. Your father ought to be worth some money to provide for such a family." "He is not, he is a poor man; so poor that he kept me in school less than two years. I went into the shop to work with him when I was ten years old, and have not been to school since. All my brothers were apprenticed at ten or twelve years of age. I was a printer's apprentice at twelve years of age." "And what was your father's business, if I may be permitted to ask? Your story is a very interesting one, and I want to know more about it."

[D6-C0008] Naturally in so large a family, where the means of support were so slender, young Benjamin had to get most of his education outside of the schoolroom, and something of this practical unscholastic training clung to his mind always. Perhaps this was just as well in that age and place, where theology and education were synonymous terms. Certainly his consequent lack of deep root in the past and his impressionability, though limitations to his genius, make him the more typical of American intelligence. At the age of eight he was sent to the grammar school, where he remained less than a year, and then passed under the charge of Mr. George Brownell, a teacher of the three R's. Benjamin had learned to read so young that he himself could not remember being unable to read, and at school he did notably well. It is curious, however, that he found difficulty with his arithmetic, and was never a mathematician, though later in life he became skillful in dealing with figures. No error could be greater than Carlyle's statement that ability in mathematics is a test of intelligence. Goethe, scientist as well as poet, could never learn algebra; and Faraday, the creator of electrical science, knew no mathematics at all.

[D4-C0028] At the age of eight years, Benjamin entered the Boston Grammar School. His progress was very rapid, and at the close of the year he was at the head of his class. The father had hoped to give his promising boy a liberal education; but his large family and straitened circumstances rendered it necessary for him to abandon the plan. At the age of ten years his school life was completed, and he was taken into his father's shop to run of errands, and to attend to the details of candle-making, cutting wicks, filling moulds, and waiting upon customers. He could write a good hand, could read fluently, could express himself with ease on paper, but in all arithmetical studies was very backward.

[D3-C0107] "You will not take him out of school until John leaves, will you?" inquired Mrs. Franklin. "I shall have him leave the public school at the close of this term, and that will give him a full year's schooling. And then I shall put him into Mr. Brownwell's school for a while to improve him in penmanship and arithmetic. By that time I must have him in the factory." Mr. Brownwell had a private school, in which he taught penmanship and arithmetic. It was quite a famous school, made so by his success as a teacher in these departments. Benjamin had received no intimation, at this time, that he would be taken out of school. His father shrunk from disclosing his final plan to him because he knew it would be so disappointing. But as the close of the school year drew near, he was obliged to open the subject to him. It was an unpleasant revelation to Benjamin, although it was not altogether unexpected. For, in the outset, his father had said that such might be the necessity.

[D3-C0299] Examples of industry, enterprise, despatch, promptness, punctuality, and circumspection are inspiring to both old and young; and nowhere do these noble qualities appear to better advantage than they do where busy brains and hands make the newspaper in the printing office. It is a remarkably useful school. It was so when Benjamin was a boy. It was a far better school for him than that of Williams or Brownwell. Here he laid the foundation of his learning and fame. The same was true of Horace Greeley, who founded the _New York Tribune_, and of Henry J. Raymond, who made the _Times_ what it is. The late Vice-President Schuyler Colfax was schooled in a printing office for his honorable public career; and the same was true of other distinguished statesmen. But none of these examples are so remarkable as the following, that was made possible by Benjamin Franklin's example.

[D4-C0036] The judicious father, apprehensive that his son might be lured secretly to embark for some distant voyage, visited with his son all the varied workshops of Boston, that he might select that trade which to him would seem most desirable. Benjamin examined all these workshops with intensest interest. He selected the employment of a cutler, and entered upon the business for a few days; but at that time a boy who was about to learn a trade was apprenticed to a master. As a premium for learning the business he usually had to pay about one hundred dollars. Then after a series of years, during which he worked for nothing, he was entitled for a time to receive journeyman's wages. But his father, Josiah Franklin, was unable to settle satisfactorily the terms of indenture, and the cutlery trade was given up.

[D3-C0153] Mr. Franklin lost no time in securing a place in Samuel's shop. Both parties agreed that it would be best for Benjamin to spend a brief period in the business before settling the terms of apprenticeship. Accordingly he entered upon his new trade immediately, and was much pleased with it. It was so different from the work of candle-making, and required so much more thought and ingenuity, that he enjoyed it. He went to each day's work with a light and cheerful heart. He was soon another boy in appearance, contented, happy, and hopeful. Samuel recognized his ingenuity and willingness to work, and prophesied that he would become an expert cutler. He was ready to receive him as an apprentice, and Benjamin was willing to be bound to him until he was twenty-one years of age.

[D4-C0037] We have mentioned that Franklin was one of a large family of children. By the two marriages of his father, there were sixteen sons and daughters around the family hearth. One of the sons, James, had been sent to London to learn the trade of a printer. He returned to Boston and set up business on his own account, when Benjamin was eleven years of age. It was decided to bind Benjamin to this business. Reluctantly Benjamin consented to place himself in such subordination to his brother. He was, however, bound to him for a period of nine years, from twelve to twenty-one. During the last year he was to receive a journeyman's wages. The following extract from this form of indenture of apprenticeship, which was in common use in the reign of George the First, will be read with interest.

[D3-C0174] Mr. Franklin lost no time in conferring with James, who favored the plan without any reserve. He proposed to take Benjamin as an apprentice, to serve until he was twenty-one years old, according to the custom of the times, receiving twenty pounds for the same, and giving him board and clothes until the last year, when he would be paid journeyman's wages. This was a good opportunity on the whole, for printing was in its infancy in our country at that time. Not more than six or eight persons had been in the business in Boston before James Franklin commenced, in the year 1717. The demand for printing must have been very small indeed. The first printing press in the United States was set up in Cambridge in 1639 by Rev. Jesse Glover, who gave it to Harvard University. The first thing printed was the "Freeman's oath"; the next, the almanac for New England, calculated by William Pierce, a mariner; the next, a metrical version of the Psalms.

[D4-C0077] It was late in the afternoon when they reached the port. For thirty hours they had been without food or water. Such were the perils of a passage from New York to Philadelphia in the year 1723. Franklin, in the enjoyment of magnificent health, slept quietly that night in an humble inn, and awoke in the morning with all his accustomed vigor. There were still fifty miles of land travel before him, ere he could cross the forest covered plains of New Jersey to Burlington, on the banks of the Delaware, which were seventeen miles above Philadelphia. There was neither railroad, stage-coach nor cart to convey him through the wilderness. Indeed it was thirty-three years after this before the first line of stages across New Jersey was established. There was a rude path, probably following an ancient Indian trail, along which our solitary adventurer trudged on foot. It rained; but still Benjamin found it necessary, having so slender a purse, to press on regardless of discomfort.

[D5-C0039] 2. In the evening, Franklin found himself feverish, and went to bed. As he drank plentifully of cold water, his fever left him, and in the morning he proceeded on his journey. After crossing the ferry, he travelled on foot, notwithstanding a violent rain, till noon. Being now thoroughly soaked and tired, he stopped at a poor inn, where he spent the remainder of the day, and all night. 3. He now began to wish that he had never left home. His prospect of procuring employment, even when he should arrive at Philadelphia, was uncertain. He thought of the distress his sudden disappearance must have occasioned to his parents. Besides all this, he made such a sorry figure that he was suspected of being a runaway servant, and in danger of being taken up on that suspicion.

[D6-C0027] II BEGINNINGS IN PHILADELPHIA AND FIRST VOYAGE TO ENGLAND The only printer then in New York was old William Bradford, formerly of Philadelphia, whose monument may still be seen in Trinity Churchyard. To Mr. William Bradford accordingly young Franklin applied for work; but there was little printing done in the town and Bradford had no need of another hand at the press. He told Franklin, however, that his son at Philadelphia had lately lost his principal assistant by death, and advised Franklin to go thither. Without delay Franklin set out for that place, and after a somewhat adventurous journey arrived at the Market Street wharf about eight or nine o'clock of a Sunday morning.

[D4-C0076] "He may employ you, as he has recently lost an apprentice by death." Leaving his chest of clothes to go round by sea to Philadelphia, Benjamin took passage in a small dilapidated shore boat which crept along the coast to Amboy. A drunken Dutchman was his only fellow passenger. The gloom of the primeval forest overshadowed Governor's Island: not a single cabin as yet had been reared in its solitudes. A squall struck the boat, split its sail, and pitched the Dutchman overboard. Franklin caught him by the hair and saved him from drowning. The sudden tempest increased into a storm, and the boat was driven fiercely before the gale. The surf dashed so violently upon the shore that they could not venture to land. Night approached. Exhausted, drenched and hungry, they cast anchor near the Long Island shore, where a bend in the land afforded them slight protection while still they were in great danger. There were one or two log cabins in the vicinity. Several of the men came to the shore, but could afford them no relief. They had no provision on board excepting a single bottle of bad rum. All night long the tempest beat upon them. In the morning the wind had so far lulled that they were enabled to repair their sail, and to work their way on to Amboy.

[D4-C0275] "That part of my hand and fingers which held the chain, was left white as though the blood had been driven out; and remained so eight or ten minutes after, feeling like dead flesh; and I had numbness in my arms and the back of my neck which continued to the next morning, but wore off." Franklin was much mortified at his awkwardness in this experiment. He declared it to be a notorious blunder, and compared it with the folly of the Irishman, who wishing to steal some gun-powder, bored a hole through the cask with red hot iron. But notwithstanding this warning, not long afterwards, in endeavoring to give a shock to a paralytic patient, he received the whole charge himself, and was knocked flat and senseless on the floor.

[D4-C0481] Franklin immediately commenced packing his trunks. Astonishing, almost incredible as it may appear, the evidence seems conclusive that through all these trying scenes, Franklin was a cheerful, it is hardly too strong a word to use, a _jovial_ man. It has been well said, that to be angry is to punish one's self for the sins of another. Our philosopher had no idea of making himself unhappy, because British lords behaved like knaves. He continued to be one of the most entertaining of companions. A cloudless sun seemed to shine wherever he moved. He made witty speeches. He wrote the most amusing articles for the journals, and the invariable gayety of his mind caused his society to be eagerly sought for.

[D4-C0495] [Footnote 25: "And here perhaps we have one of the reasons why Dr. Franklin, who was universally confessed to be the ablest pen in America, was not always asked to write the great documents of the Revolution. He would have put a joke into the Declaration of Independence, if it had fallen to him to write it. At this time he was a humorist of fifty years standing, and had become fixed in the habit of illustrating great truths by grotesque and familiar similes. His jokes, the circulating medium of Congress, were as helpful to the cause, as Jay's conscience or Adams' fire; they restored good humor, and relieved the tedium of delay, but were out of place in formal, exact and authoritative papers."--_Parton's Franklin_, Vol. 2. p. 85.] One of Franklin's jokes, in Congress, is very characteristic of the man. It was urged that the Episcopal clergy should be directed to refrain from praying for the king. Franklin quenched the injudicious movement with a witticism.

[D2-C0031] He seems to have been totally without either irritability or excitability. In this he was the reverse of Washington, who was subject to violent outbursts of anger, could swear “like an angel of God,” as one of his officers said, and had a fiery temper to control. Perhaps Franklin’s strong sense of humor saved him from oaths; there are no swearing stories recorded of him; instead of them we have innumerable jokes and witticisms. His anger when aroused was most deliberate, calculating, and judicious. His enemies and opponents he always ridiculed, often, however, with so little malice or sting that I have no doubt they were sometimes compelled to join in the laugh. He never attacked or abused.

[D4-C0110] [Illustration] This breaking in upon his friend Vernon's money, and spending it, he pronounces in his autobiography, to have been the _first great error_ of his life. Though it so chanced that the money was not required until Franklin was able to pay it, yet for several months he was in the endurance of intense mental anxiety and constant self-reproach.

[D3-C0168] "And that makes your guilt so much the greater. Will you learn a lesson from this, and never do the like again?" "I promise that I never will." Thus frankly Benjamin confessed his wrong-doing; and, in mature life, he often referred to it as his "_first wrong act_" from which he learned a lesson for life. It was another way of _paying too dear for a whistle_. What the whistle was to him at seven, the wharf of stones was to him at twelve years of age--sport. The first was innocent sport, however; the last was guilty.

[D4-C0027] There was a marsh, flooded at high tides, where the boys used to fish for minnows. Much trampling had converted the spot into a quagmire. A man was about to build a house near by, and had carted a large quantity of stones for the cellar. Franklin called the boys together and suggested that they should go in the evening, take those stones, and build a wharf upon which they could stand with dry feet. It was done. And under the skilful engineering of the youthful Franklin, it was quite scientifically done. Complaints and detection followed. Josiah Franklin severely reproved Benjamin for the dishonest act, but it does not appear that the conscience of the precocious boy was much troubled. He argued very forcibly that the utility of the measure proved its necessity.

[D4-C0139] [Footnote 8: Franklin writes in his autobiography, "I grew fond of her company, and being at that time under no religious restraint, and taking advantage of my importance to her, I attempted to take some liberties with her, another _erratum_, which she repulsed with a proper degree of resentment. She wrote to Ralph and acquainted him with my conduct. This occasioned a breach between us; and when he returned to London, he let me know he considered all the obligations he had been under to me as annulled."--Works of Franklin, Vol. i, p. 59.]

[D2-C0707] Franklin made a great mistake in not agreeing with him, for in the suspicious state of people’s minds at that time his conduct in this respect was taken as proof positive of his subserviency to the French court. Jay suspected that Vergennes advised accepting Oswald’s commission so as to prevent a clear admission of independence, and thus keep the United States embroiled with England as long as possible. In order to support his opposition to Jay, Franklin was obliged to talk about his confidence in the French court, its past generosity and friendliness, and also to call attention to the instruction of Congress that the commissioners should do nothing without the knowledge of the French government, and in all final decisions be guided by that government’s advice.

[D6-C0065] With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the same house with him, and now Mrs. Godfrey undertook to make a match between him and the daughter of a relative of hers. Franklin's account of this affair for its coolness and placidity may almost be compared with Gibbon's "I sighed as a lover, I obeyed as a son." On learning that the girl's parents could not or would not give with her enough money to pay off his debts, the gallant suitor at once and irrevocably withdrew. He then looked about him for another match, but found to his chagrin that an adventurous printer could not command an agreeable wife and a dowry at the same time. Being determined to marry, that he might bring order into his life, he at last turned to Miss Read, with whom he had maintained a friendly correspondence, and notwithstanding the difficulties in the way married her on the 1st of September, 1730.

[D4-C0194] Occasionally Franklin had gone to the home of Mrs. Read, the mother of the unhappy Deborah. His conscience reproached him for his conduct to that good girl. She was always dejected and solitary, and with a broken heart clung to her mother, her only friend. It is doubtful whether she were ever legally married to Rogers. It was rumored that at the time of their marriage, he was the husband of one, if not more wives. If legally married, there was another serious obstacle in her path. Rogers had run away to the West Indies. Rumor alone had announced his death. He might be still living. Franklin's sympathy gradually became excited in her behalf. And at length he proposed that, regardless of all the risks, they should be married. It seems that he had announced to her very distinctly that he had a living child, and very honorably he had decided that that child of dishonor was to be taken home and trained as his own.

[D2-C0230] [Illustration: WILLIAM TEMPLE FRANKLIN] Franklin’s detractors have always insisted that no marriage ceremony was performed and that he was never legally married. There is no record of such a marriage in Christ Church, of which Mrs. Rogers was a member, and the phrase used, “took her to wife,” is supposed to show that they simply lived together, fearing a regular ceremony, which, if Rogers was alive, would convict them of bigamy. The absence of any record of a ceremony is, however, not necessarily conclusive that there was no ceremony of any kind; and the question is not now of serious importance, for they intended marriage, always regarded themselves as man and wife, and, in any event, it was a common-law marriage. Their children were baptized in Christ Church as legitimate children, and in a deed executed three or four years after 1730 they are spoken of as husband and wife.

[D2-C0228] But to return to his designs for a wife, which were by no means romantic. Miss Read, for whom he had a partiality, had married one Rogers during Franklin’s absence in London. Rogers ill treated and deserted her, and, dejected and melancholy, she was now living at home with her mother. She and Franklin had been inclined to marry before he went to London, but her mother prevented it. According to his account, she had been in love with him; but, although he liked her, we do not understand that he was in love. He never seems to have been in love with any woman in the sense of a romantic or exalted affection, although he flirted with many, both young and old, almost to the close of his life.

[D6-C0067] This was the first appearance of plate and china in our house, which afterward, in a course of years as our wealth increased, augmented gradually to several hundred pounds in value." Mrs. Franklin's temper was not of the serenest, and her manners perhaps were not such as would have honored him had she followed him into the great world; but she made him a good wife,--and we need not repeat the tattle which we are told is still current among some of the high families of Philadelphia. They had two children,--a son, the idol of his father's heart, who died as a child; and a daughter, who married Richard Bache, and is the ancestress of a large family.

[D2-C0244] [Illustration: MRS. SARAH BACHE] The other child was a daughter, Sarah, also very handsome, who married Richard Bache and has left numerous descendants. His illegitimate son, William, was brought home when he was a year old and cared for along with his other children; and William’s illegitimate son, Temple Franklin, was the companion and secretary of his grandfather in England and France. The illegitimate daughter was apparently never brought home, and is not referred to in his writings, except in those occasional letters in which he sends her his love. According to the letter already mentioned as in the collection of the Pennsylvania Historical Society, she was married to John Foxcroft, who was deputy colonial postmaster in Philadelphia. It was well that she was kept away from Franklin’s house, for the presence of William appears to have given trouble enough. A household composed of legitimate and illegitimate children is apt to be inharmonious at times, especially when the mother of the legitimate children is the mistress of the house.

[D4-C0353] His influential and wealthy friend, Mr. Strahan, was anxious to unite their two families by the marriage of his worthy and prosperous son to Mr. Franklin's beautiful daughter, Sarah. But the plan failed. Franklin also made an effort to marry his only son William, who, it will be remembered, was not born in wedlock, to a very lovely English lady, Miss Stephenson. But this young man, who, renouncing revealed religion, was a law unto himself, had already become a father without being a husband. Miss Stephenson had probably learned this fact and, greatly to the disappointment of Franklin, declined the alliance. The unhappy boy, the dishonored son of a dishonored father, was born about the year 1760. Nothing is known of what became of the discarded mother. He received the name of William Temple Franklin.

[D4-C0112] Almost every young man has a few particular friends. The three most intimate companions of Benjamin Franklin were young men of his own rank and age, of very dissimilar characters, but having a common taste for business. They were all clerks. One of these, Joseph Watson, was, according to Franklin's description, "a pious, sensible young man of great integrity." It would seem that they were all persons of very estimable character, though some of them had imbibed Franklin's skeptical opinions. They spent many of their Sabbaths, wandering on the banks of the romantic Schuylkill, reading to each other their compositions in prose and verse.

[D4-C0102] There was in Boston a young man by the name of Collins, a reckless, dissipated spendthrift, of very considerable personal attractions. He had been quite an intimate friend of Franklin; and was so pleased with his descriptions of Philadelphia that he decided to remove there. This proved one of the calamities of Franklin's life. Franklin eventually embarked, in a sloop, for his return. It touched at Newport. His brother John lived there, pursuing the trade of a candle-maker. Benjamin was received by him with great cordiality. At Newport, among the other passengers, two young girls were taken on board for New York. They were showy, voluble, gaudily dressed. All their arts were exerted to secure intimate association with Franklin.

[D3-C0673] "I shall do that, Ben, you may rest assured; for I will not take advantage of your generosity any longer than I can help. I mean to continue a good friend of yours whether you continue to be a good friend of mine or not." This was a shrewd way of putting it. Ralph knew the young man he was talking with thoroughly. Benjamin resolved to seek the advice of Mr. Denham. He was a Quaker merchant who sailed from Philadelphia with him. He was a stranger to him; but, when Colonel French came on board with letters from the governor at Newcastle, he introduced Benjamin to Denham. For this reason Denham became deeply interested in Benjamin, and showed him many favors. Now his advice would be specially useful to Benjamin; so he sought and found him.

[D4-C0279] Franklin was best loved where he was best known. And this was right; for he was ever conferring deeds of kindness upon his neighbors. His religious views excited sorrow among his Christian friends. Others, composing perhaps a majority, cared nothing about what he believed. In conversation he ever frankly avowed himself a deist, though generally he made no attempt to convert others to his views. It is not improbable that he was in some degree influenced by the beneficial effect produced upon the popular mind by the preaching of his friend Mr. Whitefield.

[D4-C0632] "I wish to know the opinion of my venerable friend, concerning Jesus of Nazareth. He will not impute this to impertinence; or improper curiosity in one, who, for so many years, has continued to love, esteem and reverence his abilities and literary character, with an ardor and affection bordering on adoration." What Dr. Stiles, and the community in general, wished to know was, whether Dr. Franklin recognized the Divine, supernatural origin of Christianity. Franklin evaded the question. This evasion of course indicates that he did not recognize, in the religion of Jesus, the authority of, "Thus saith the Lord." But he wished to avoid wounding the feelings of his Christian friends by this avowal. He wrote,

[D4-C0371] Thus all the partisans of the Penns, and all the office holders of the crown and their friends, and there were many such, became not only opposed to Franklin, but implacable in their hostility. The majority of the Assembly was with him. He was chosen Speaker, and then was elected to go again to England, to carry with him to the British Court the remonstrances of the people against "taxation without representation," and their earnest petition to be delivered from the tyranny of the Penns. More unwelcome messages to the British Court and aristocracy, he could not well convey. It was certain that the Penns and their powerful coadjutors, would set many influences in array against him. Mr. Dickinson, in the Assembly, remonstrating against this appointment, declared that there was no man in Pennsylvania who was more the object of popular dislike than Benjamin Franklin.

[D6-C0109] The governor, a nephew of the proprietaries, came, as all men did, to Franklin in his perplexity; he even lodged in Franklin's house, and concerted with him hourly on the means of repelling the invaders. The "Paxton boys" had reached Germantown. The city was in a panic, and there was no time to lose. Franklin first got together a regiment of militia, and then, with three other gentlemen, went out to Germantown to remonstrate with the fanatics. His mission was successful, and the insurrection was quelled; but Franklin himself had gained many enemies by his action. The people were largely in favor of the Paxton rioters; and the governor, now relieved of his immediate fears, made an infamous proclamation setting a price upon Indian scalps. A strong coalition was formed against Franklin; to the enmity of the proprietary party was now added the distrust of the people.

[D4-C0606] Such were the colleagues united with Franklin, in the negotiations for peace. It required all his consummate wisdom to be able to guide affairs wisely under such difficult circumstances. It may be doubted whether there was another man in America, who could have surmounted the obstacles over which he triumphed. Both of Franklin's colleagues regarded him with suspicion. They believed that he had been won over to such sympathy with the French, that he would be willing to sacrifice the interests of his own country to please them. They wrote letters home severely denouncing him; and they seemed to stand more in fear of France than of England. "Dr. Franklin," wrote Mr. Adams, "is very staunch against the Tories; more decided, a great deal, upon that point, than Mr. Jay or myself."

[D3-C0855] Franklin was forty-two years old at this time; and it is a singular fact that his career as a philosopher did not begin really until he had passed his fortieth birthday. But from the time he was released from the care of the printing office, his advancement in science was rapid. His fame spread abroad, both in this country and Europe, so that, in a few years, he became one of the most renowned philosophers in the world. In a former chapter we described his experiment with a kite, to prove that lightning and the electric fluid are identical; and this discovery established his fame as the greatest electrician of the world. The Royal Society of London elected him a member by a unanimous vote, and the next year bestowed upon him the Copley medal. Yale College conferred upon him the degree of Master of Arts; and Harvard University did the same. Suddenly Franklin found himself the most conspicuous character in American history--a philosopher of the most honored type.

[D2-C0377] After he had proved in such a brilliant manner that lightning was merely one of the forms or phenomena of that mysterious fire which appears when we rub a glass tube with buckskin, Franklin made no more discoveries in science; but his interest and patience of research were unabated. He cannot be ranked among the great men of science, the Newtons and Keplers, or the Humboldts, Huxleys, or Darwins. He belongs rather in the second class, among the minor discoverers. But his discovery of the nature of lightning was so striking and so capable of arousing the wonder of the masses of mankind, and his invention of the lightning-rod was regarded as so universally valuable, that he has received more popular applause than men whose achievements were greater and more important.

[D2-C0373] But it was Franklin’s good fortune on a number of occasions to be placed in picturesque and striking situations, which greatly increased his fame. He did not foresee that kite-flying would be one of these, and as it was not essential to his discovery of the nature of lightning, he was disinclined at first to think much of it, and did not even report it to Mr. Collinson until after several months had elapsed. But the world fixed upon it instantly as something easy to remember. To this day it is the popular way of illustrating Franklin’s discovery, and is all that most people know of his contributions to science.

[D2-C0363] Franklin was by no means alone in his studies. Besides the crowds who were interested from mere curiosity, there were three men--Ebenezer Kinnersley, Thomas Hopkinson, and Philip Syng--who experimented with him, and it was no mere amateurish work in which these men were engaged. Franklin was their spokesman and reported the results of his and their labor by means of letters to Mr. Peter Collinson. Within six months Hopkinson had observed the power of points to throw off electricity, or electrical fire, as he called it, and Franklin had discovered and described what is now known as positive and negative electricity. Within the same time Syng had invented an electrical machine, consisting of a sphere revolved on an axis with a handle, which was better adapted for producing the electrical spark than the tube-rubbing practised in Europe.

[D2-C0389] He invented a stove that would consume its own smoke, taking the principle from a Frenchman who had shown how the flame of a burning substance could be made to draw downward through the fuel, so that the smoke was burnt with the fuel. But the way in which this invention is usually described would lead one to suppose that it was entirely original with Franklin. He was much interested in agriculture, and was an earnest advocate of mineral manures, encouraged grape culture, and helped to introduce the basket willow and broom-corn into the United States. He at one time owned a farm of three hundred acres near Burlington, New Jersey, where he tried agricultural experiments. He dabbled in medicine, as has been shown, and also wasted time over that ancient delusion, phonetic spelling.

[D2-C0364] The experiments and the letters to Collinson describing them continued, and about this time we find Franklin writing a long and apparently the first intelligent explanation of the action of the Leyden jar. Then followed attempts to explain thunder and lightning as phenomena of electricity, and on July 29, 1750, Franklin sent to Collinson a paper announcing the invention of the lightning-rod, together with an explanation of its action.

[D1-C0294] In order of time, I should have mentioned before, that having, in 1742, invented an open stove for the better warming of rooms, and at the same time saving fuel, as the fresh air admitted was warmed in entering, I made a present of the model to Mr. Robert Grace, one of my early friends, who, having an iron-furnace, found the casting of the plates for these stoves a profitable thing, as they were growing in demand. To promote that demand, I wrote and published a pamphlet, entitled "An Account of the new-invented Pennsylvania Fireplaces; wherein their Construction and Manner of Operation is particularly explained; their Advantages above every other Method of warming Rooms demonstrated; and all Objections that have been raised against the Use of them answered and obviated," etc. This pamphlet had a good effect. Gov'r. Thomas was so pleas'd with the construction of this stove, as described in it, that he offered to give me a patent for the sole vending of them for a term of years; but I declin'd it from a principle which has ever weighed with me on such occasions, viz., That, as we enjoy great advantages from the inventions of others, we should be glad of an opportunity to serve others by any invention of ours; and this we should do freely and generously.

[D4-C0351] His business detained Franklin in London all summer. In the autumn he took a tour into the west of England and Wales. The gales of winter were now sweeping the Atlantic. No man in his senses would expose himself to a winter passage across the ocean, unless it was absolutely necessary. Indeed it would appear that Franklin was so happy in England, that he was not very impatient to see his home again. Though he had been absent three years from his wife and child, still two years more elapsed before he embarked for his native land.

[D4-C0489] The voyage across the Atlantic occupied six weeks. In the evening twilight of the 5th of May, the ship dropped anchor in the Delaware, opposite Philadelphia. Franklin landed, and walked alone through the darkened streets towards his home. It is difficult to imagine the emotions with which his heart must have been agitated in that hour. Ten years had elapsed since he left his home. In the meantime his wife had reared another dwelling, in Market street, and there she had died. He had left his daughter Sarah, a child of twelve years. He was to find her a matron surrounded by her babes.

[D5-C0228] 10. When the independence of the United States was acknowledged by Great Britain, Franklin became desirous of returning home. The infirmities of age and disease had fallen upon him, and the situation of his country rendered his services no longer indispensably necessary. He applied to congress to be recalled, and Mr. Jefferson was appointed to succeed him in 1785. In September of the same year, Franklin arrived in Philadelphia. He was shortly after chosen a member of the supreme council for the city, and was soon elected president of the same body.

[D3-C0195] The habit of punctuality which Franklin formed in his youth, distinguished him in his manhood as much as the same habit did Washington. There is no doubt that it exerted a large influence in placing him next to Washington among the founders of our republic. One of the maxims that he wrote in mature life was: "He that riseth late must trot all day, and shall scarce overtake his business at night." IX. TABLE-TALK EDUCATION. We delay the narrative, at this point, to introduce a subject that Franklin often referred to as influencing his early life. In his "Autobiography," he said:

[D3-C0192] The habit of reading that Benjamin had formed tended to make him punctual. In order to command the more time he was promptly at his work, and efficiently discharged every duty. It was this well-formed habit of punctuality that made him so reliable in the printing office. His brother knew that he would be there at such a time, and that he would remain just so many hours. This habit won his confidence, as it does the confidence of every one. There is no quality that does more to gain a good name for an individual, and inspire the confidence of his fellow-men, than this one of being on time. It is so generally found in company with other excellent traits of character, that it seems to be taken for granted, usually, that the punctual person is worthy in other respects.

[D3-C0306] It was probably as true of Benjamin Franklin as it was of Thomas Hood, that reading saved him from a career of worldliness and worthlessness. In his manhood he regarded the habit in this light, and said: "From my infancy I was passionately fond of reading, and all the money that came into my hands was laid out in the purchasing of books." If he had laid out his money in billiards, boating, theatre-going, and kindred pleasures, as so many do, he might have been known in manhood as Ben, the Bruiser, instead of "Ben, the Statesman and Philosopher." The first book Benjamin read was "Bunyan's Pilgrim's Progress." He was fascinated with it, and read it over and over, much to the gratification of his parents. "What is there about it that interests you so much?" inquired his father, hoping that it might be the subject alone. "The dialogues that are carried on in it," replied Benjamin.

[D2-C0084] He had an intimate friend, John Collins, likewise inclined to books, and the two argued and disputed with each other. Franklin was fond of wordy contention at that time, and it was possibly a good mental training for him. He had caught it, he says, from reading his father’s books of religious controversy. But in after-years he became convinced that this disputatious turn was a very bad habit, which made one extremely disagreeable and alienated friends; he therefore adopted during most of his life a method of cautious modesty.

[D3-C0212] The temperate habits which Benjamin formed in his youth were the more remarkable because there were no temperance societies at that time, and it was generally supposed to be necessary to use intoxicating drinks. The evils of intemperance were not viewed with so much abhorrence as they are now, and the project of removing them from society was not entertained for a moment. Reformatory movements of this kind did not begin until nearly a century after the time referred to. Yet Benjamin was fully persuaded in his youth that he ought to be temperate in all things. It was a theme of conversation at his father's table and fireside. That conversation instructed him then, as temperance lectures, books, and societies instruct the young now; and it accomplished its purpose. In the sequel we shall learn still more of the moulding power of home lessons, in conversation, to make him the man he became.

[D4-C0639] "Jesus can make a dying bed Feel soft as downy pillows are." A few hours before his death, as some one urged him to change his position, that he might breathe easier he replied, "a dying man can do nothing easy." These were his last words. He then sank into a lethargy, from which he passed into that sleep which has no earthly waking. It was eleven o'clock at night, April 17, 1790. He had lived eighty-four years, three months and eleven days. But no candid and charitable reader can peruse this narrative, without the admission that Benjamin Franklin, notwithstanding his imperfections, was one of the wisest and best of all the fallen children of Adam. From his dying hour to the present day his memory has been justly cherished with reverence and affection, throughout the civilized world. And there is no fear that this verdict will ever be reversed. TRANSCRIBER'S NOTE:

Write the story. Return JSON matching the schema.
```

**Raw response:**

```json
{
  "title": "The Life of Benjamin Franklin",
  "paragraphs": [
    {
      "sentences": [
        {
          "text": "Benjamin Franklin was born in Boston on January 6, 1706, according to some records, while another source states he was born on January 17, 1706.",
          "chunk_ids": [
            "D6-C0007",
            "D5-C0010"
          ]
        },
        {
          "text": "His father, Josiah Franklin, was a man of honest industry who lived in Boston, and his ancestors had long lived in Northamptonshire as smiths.",
          "chunk_ids": [
            "D6-C0004",
            "D5-C0010"
          ]
        },
        {
          "text": "His mother was Abiah Folger, the daughter of Peter Folger.",
          "chunk_ids": [
            "D3-C0057"
          ]
        },
        {
          "text": "He came from a large family of seventeen children and was celebrated from early childhood for his physical beauty, athletic vigor, and imperturbable good nature.",
          "chunk_ids": [
            "D4-C0026",
            "D5-C0010"
          ]
        }
      ]
    },
    {
      "sentences": [
        {
          "text": "At the age of eight, Benjamin was sent to grammar school and studied under Mr. George Brownell, but his formal schooling ended at ten when he began working in his father's shop.",
          "chunk_ids": [
            "D6-C0008",
            "D4-C0028",
            "D3-C0107"
          ]
        },
        {
          "text": "He was passionately fond of reading from childhood and spent all his savings on books.",
          "chunk_ids": [
            "D6-C0013"
          ]
        },
        {
          "text": "After a brief attempt at learning the cutler trade, it was decided to bind him as an apprentice to his older brother James to learn the trade of a printer.",
          "chunk_ids": [
            "D4-C0036",
            "D4-C0037",
            "D3-C0174"
          ]
        },
        {
          "text": "Working in a printing office served as a school where he laid the foundation of his learning and fame, while also forming habits of punctuality and temperance.",
          "chunk_ids": [
            "D3-C0299",
            "D3-C0195",
            "D2-C0084"
          ]
        }
      ]
    },
    {
      "sentences": [
        {
          "text": "In 1723, he undertook a perilous and adventurous journey from New York to Philadelphia, traveling without food or water for thirty hours, enduring rain, and trudging through a wilderness where he was suspected of being a runaway servant.",
          "chunk_ids": [
            "D4-C0077",
            "D5-C0039",
            "D6-C0027"
          ]
        },
        {
          "text": "During another boat journey, a squall struck his vessel, pitching a passenger overboard whom Franklin saved by catching him by the hair.",
          "chunk_ids": [
            "D4-C0076"
          ]
        },
        {
          "text": "On September 1, 1730, Franklin married Deborah Read, who made him a good wife.",
          "chunk_ids": [
            "D6-C0065",
            "D6-C0067"
          ]
        },
        {
          "text": "They had children together, including a son who died as a child and a daughter named Sarah, and Franklin also brought home his illegitimate son William.",
          "chunk_ids": [
            "D6-C0067",
            "D2-C0244"
          ]
        }
      ]
    },
    {
      "sentences": [
        {
          "text": "Franklin engaged in extensive scientific pursuits and is best known for his discovery of the nature of lightning through his kite experiment.",
          "chunk_ids": [
            "D3-C0855"
          ]
        },
        {
          "text": "He discovered and described positive and negative electricity, invented an open stove in 1742 for better warming rooms while saving fuel, and announced the invention of the lightning-rod.",
          "chunk_ids": [
            "D2-C0363",
            "D2-C0364",
            "D1-C0294"
          ]
        },
        {
          "text": "Known for his strong sense of humor, he often used jokes and witticisms to relieve tension and restore good humor in Congress.",
          "chunk_ids": [
            "D4-C0495",
            "D2-C0031"
          ]
        }
      ]
    },
    {
      "sentences": [
        {
          "text": "Benjamin Franklin passed away at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his final words.",
          "chunk_ids": [
            "D4-C0639"
          ]
        },
        {
          "text": "He is remembered as one of the wisest of men, and his memory has been cherished with reverence and affection throughout the civilized world.",
          "chunk_ids": [
            "D4-C0639"
          ]
        }
      ]
    }
  ]
}
```
</details>

## Audit prompt

<details><summary>Prompt sent</summary>

```text
SYSTEM:
You are a strict fact-checker. For each numbered sentence you get the source snippets it cites. Decide whether the snippets alone support it.
- "supported": every claim in the sentence is stated in the cited snippets.
- "partial": the main claim is supported but a detail (a date, name, number, place or description) is not in the snippets.
- "unsupported": the snippets do not support the sentence.
Judge only against the snippets, never against what you know. For partial or unsupported, name the unsupported part in "problem".

USER:
#1: Benjamin Franklin was born in Boston on January 6, 1706, according to some records, while another source states he was born on January 17, 1706.
Cited snippets:
[D6-C0007] But we forget that our hero, like Tristram Shandy, is still in the limbo of non-existence. Benjamin Franklin was born in Boston, January 6 (old style), 1706. At that time the family home was in Milk Street, opposite the Old South Church, to which sacred edifice the child was taken the day of his birth, tradition asserting that his own mother carried him thither through the snow. Shortly afterwards the family moved to a wooden house on the corner of Hanover and Union streets.
[D5-C0010] LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

---

#2: His father, Josiah Franklin, was a man of honest industry who lived in Boston, and his ancestors had long lived in Northamptonshire as smiths.
Cited snippets:
[D6-C0004] Franklin's ancestors were of the sturdy sort that have made the strength of the Anglo-Saxon race. For three hundred years at least his family had lived on a freehold of thirty acres in the village of Ecton, Northamptonshire; and for many generations father and son had been smiths. Parton, in his capital Life of Franklin, has observed that Washington's ancestors lived in the same county, although much higher in the social scale; and it may well have been that more than one of Franklin's ancestors "tightened a rivet in the armor or replaced a shoe upon the horse of a Washington, or doffed his cap to a Washington riding past the ancestral forge." During these long years the family seems to have gathered strength from the soil, as families are wont to do. Seeing how the Franklins, when the fit of emigrating seized upon them, blossomed out momentarily, and then dwindled away, we are reminded of Poor Richard's wise observation,--
[D5-C0010] LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

---

#3: His mother was Abiah Folger, the daughter of Peter Folger.
Cited snippets:
[D3-C0057] So young and large a family needed a mother's watch and care, as Josiah Franklin found to his sorrow. The additional burden laid upon him by the death of his wife interfered much with his business, and he saw fresh reasons each day for finding another help-mate as soon as possible. To run his business successfully, and take the whole charge of his family, was more than he could do. In these circumstances he felt justified in marrying again as soon as possible, and, with the aid of interested friends, he made a fortunate choice of Abiah Folger, of Nantucket, a worthy successor of the first Mrs. Franklin. He married her a few months after the death of his first wife. The second Mrs. Franklin became the mother of ten children, which, added to those of the first Mrs. Franklin, constituted a very respectable family of seventeen children, among whom was Benjamin, the fifteenth child. His "Autobiography" says: "Of the seventeen children I remember to have seen thirteen sitting together at the table, who all grew up to years of maturity and were married." Of the second wife it says: "My mother, the second wife of my father, was Abiah Folger, daughter of Peter Folger, one of the first settlers of New England, of whom honorable mention is made by Cotton Mather in his ecclesiastical history of that country, 'as a godly and learned Englishman.'"

---

#4: He came from a large family of seventeen children and was celebrated from early childhood for his physical beauty, athletic vigor, and imperturbable good nature.
Cited snippets:
[D4-C0026] From early childhood Franklin was celebrated for his physical beauty, his athletic vigor and his imperturbable good nature. His companions invariably recognized him as their natural leader. He was in no respect what would be called a religious boy, but in many things he had a high sense of honor.
[D5-C0010] LIFE OF FRANKLIN. CHAPTER I. _Birth of Franklin. Early Education. Anecdote. Choice of a Trade. He is placed with a Cutler. His Fondness for Reading. Bound Apprentice to his Brother. Makes a couple of Ballads. His Friend Collins. Reads the Spectator._ 1. Benjamin Franklin was born in Boston, New England, on the seventeenth of January, 1706. He was the youngest son in a family of seventeen children. His elder brothers were, at an early age, put apprentices to different trades; for their father was a man of honest industry, but with little or no property, and unable to support the expense of keeping them long at school.

---

#5: At the age of eight, Benjamin was sent to grammar school and studied under Mr. George Brownell, but his formal schooling ended at ten when he began working in his father's shop.
Cited snippets:
[D6-C0008] Naturally in so large a family, where the means of support were so slender, young Benjamin had to get most of his education outside of the schoolroom, and something of this practical unscholastic training clung to his mind always. Perhaps this was just as well in that age and place, where theology and education were synonymous terms. Certainly his consequent lack of deep root in the past and his impressionability, though limitations to his genius, make him the more typical of American intelligence. At the age of eight he was sent to the grammar school, where he remained less than a year, and then passed under the charge of Mr. George Brownell, a teacher of the three R's. Benjamin had learned to read so young that he himself could not remember being unable to read, and at school he did notably well. It is curious, however, that he found difficulty with his arithmetic, and was never a mathematician, though later in life he became skillful in dealing with figures. No error could be greater than Carlyle's statement that ability in mathematics is a test of intelligence. Goethe, scientist as well as poet, could never learn algebra; and Faraday, the creator of electrical science, knew no mathematics at all.
[D4-C0028] At the age of eight years, Benjamin entered the Boston Grammar School. His progress was very rapid, and at the close of the year he was at the head of his class. The father had hoped to give his promising boy a liberal education; but his large family and straitened circumstances rendered it necessary for him to abandon the plan. At the age of ten years his school life was completed, and he was taken into his father's shop to run of errands, and to attend to the details of candle-making, cutting wicks, filling moulds, and waiting upon customers. He could write a good hand, could read fluently, could express himself with ease on paper, but in all arithmetical studies was very backward.
[D3-C0107] "You will not take him out of school until John leaves, will you?" inquired Mrs. Franklin. "I shall have him leave the public school at the close of this term, and that will give him a full year's schooling. And then I shall put him into Mr. Brownwell's school for a while to improve him in penmanship and arithmetic. By that time I must have him in the factory." Mr. Brownwell had a private school, in which he taught penmanship and arithmetic. It was quite a famous school, made so by his success as a teacher in these departments. Benjamin had received no intimation, at this time, that he would be taken out of school. His father shrunk from disclosing his final plan to him because he knew it would be so disappointing. But as the close of the school year drew near, he was obliged to open the subject to him. It was an unpleasant revelation to Benjamin, although it was not altogether unexpected. For, in the outset, his father had said that such might be the necessity.

---

#6: He was passionately fond of reading from childhood and spent all his savings on books.
Cited snippets:
[D6-C0013] But swimming and boyish play formed a small, though it may be important, part of his education. He was from childhood up "passionately fond of reading," and he was moreover a wise reader, which is still better. Books were not so easy to get in those days; and the good libraries of the country were composed chiefly of great theological volumes in folio on the shelves of the clergymen's studies. But in one way and another Franklin contrived to lay hands on the food he most needed. All the money he could save he devoted to buying books, and he even had recourse to unusual methods of saving for this purpose. When sixteen he chanced to read a treatise commending a vegetable diet, and forthwith he put himself under this regimen, finding he could thus set aside half his board money to increase his library. He also made the acquaintance of the booksellers' apprentices from whom he could borrow books; and often he would read late into the night so as to return the purloined volume early the next morning.

---

#7: After a brief attempt at learning the cutler trade, it was decided to bind him as an apprentice to his older brother James to learn the trade of a printer.
Cited snippets:
[D4-C0036] The judicious father, apprehensive that his son might be lured secretly to embark for some distant voyage, visited with his son all the varied workshops of Boston, that he might select that trade which to him would seem most desirable. Benjamin examined all these workshops with intensest interest. He selected the employment of a cutler, and entered upon the business for a few days; but at that time a boy who was about to learn a trade was apprenticed to a master. As a premium for learning the business he usually had to pay about one hundred dollars. Then after a series of years, during which he worked for nothing, he was entitled for a time to receive journeyman's wages. But his father, Josiah Franklin, was unable to settle satisfactorily the terms of indenture, and the cutlery trade was given up.
[D4-C0037] We have mentioned that Franklin was one of a large family of children. By the two marriages of his father, there were sixteen sons and daughters around the family hearth. One of the sons, James, had been sent to London to learn the trade of a printer. He returned to Boston and set up business on his own account, when Benjamin was eleven years of age. It was decided to bind Benjamin to this business. Reluctantly Benjamin consented to place himself in such subordination to his brother. He was, however, bound to him for a period of nine years, from twelve to twenty-one. During the last year he was to receive a journeyman's wages. The following extract from this form of indenture of apprenticeship, which was in common use in the reign of George the First, will be read with interest.
[D3-C0174] Mr. Franklin lost no time in conferring with James, who favored the plan without any reserve. He proposed to take Benjamin as an apprentice, to serve until he was twenty-one years old, according to the custom of the times, receiving twenty pounds for the same, and giving him board and clothes until the last year, when he would be paid journeyman's wages. This was a good opportunity on the whole, for printing was in its infancy in our country at that time. Not more than six or eight persons had been in the business in Boston before James Franklin commenced, in the year 1717. The demand for printing must have been very small indeed. The first printing press in the United States was set up in Cambridge in 1639 by Rev. Jesse Glover, who gave it to Harvard University. The first thing printed was the "Freeman's oath"; the next, the almanac for New England, calculated by William Pierce, a mariner; the next, a metrical version of the Psalms.

---

#8: Working in a printing office served as a school where he laid the foundation of his learning and fame, while also forming habits of punctuality and temperance.
Cited snippets:
[D3-C0299] Examples of industry, enterprise, despatch, promptness, punctuality, and circumspection are inspiring to both old and young; and nowhere do these noble qualities appear to better advantage than they do where busy brains and hands make the newspaper in the printing office. It is a remarkably useful school. It was so when Benjamin was a boy. It was a far better school for him than that of Williams or Brownwell. Here he laid the foundation of his learning and fame. The same was true of Horace Greeley, who founded the _New York Tribune_, and of Henry J. Raymond, who made the _Times_ what it is. The late Vice-President Schuyler Colfax was schooled in a printing office for his honorable public career; and the same was true of other distinguished statesmen. But none of these examples are so remarkable as the following, that was made possible by Benjamin Franklin's example.
[D3-C0195] The habit of punctuality which Franklin formed in his youth, distinguished him in his manhood as much as the same habit did Washington. There is no doubt that it exerted a large influence in placing him next to Washington among the founders of our republic. One of the maxims that he wrote in mature life was: "He that riseth late must trot all day, and shall scarce overtake his business at night." IX. TABLE-TALK EDUCATION. We delay the narrative, at this point, to introduce a subject that Franklin often referred to as influencing his early life. In his "Autobiography," he said:
[D2-C0084] He had an intimate friend, John Collins, likewise inclined to books, and the two argued and disputed with each other. Franklin was fond of wordy contention at that time, and it was possibly a good mental training for him. He had caught it, he says, from reading his father’s books of religious controversy. But in after-years he became convinced that this disputatious turn was a very bad habit, which made one extremely disagreeable and alienated friends; he therefore adopted during most of his life a method of cautious modesty.

---

#9: In 1723, he undertook a perilous and adventurous journey from New York to Philadelphia, traveling without food or water for thirty hours, enduring rain, and trudging through a wilderness where he was suspected of being a runaway servant.
Cited snippets:
[D4-C0077] It was late in the afternoon when they reached the port. For thirty hours they had been without food or water. Such were the perils of a passage from New York to Philadelphia in the year 1723. Franklin, in the enjoyment of magnificent health, slept quietly that night in an humble inn, and awoke in the morning with all his accustomed vigor. There were still fifty miles of land travel before him, ere he could cross the forest covered plains of New Jersey to Burlington, on the banks of the Delaware, which were seventeen miles above Philadelphia. There was neither railroad, stage-coach nor cart to convey him through the wilderness. Indeed it was thirty-three years after this before the first line of stages across New Jersey was established. There was a rude path, probably following an ancient Indian trail, along which our solitary adventurer trudged on foot. It rained; but still Benjamin found it necessary, having so slender a purse, to press on regardless of discomfort.
[D5-C0039] 2. In the evening, Franklin found himself feverish, and went to bed. As he drank plentifully of cold water, his fever left him, and in the morning he proceeded on his journey. After crossing the ferry, he travelled on foot, notwithstanding a violent rain, till noon. Being now thoroughly soaked and tired, he stopped at a poor inn, where he spent the remainder of the day, and all night. 3. He now began to wish that he had never left home. His prospect of procuring employment, even when he should arrive at Philadelphia, was uncertain. He thought of the distress his sudden disappearance must have occasioned to his parents. Besides all this, he made such a sorry figure that he was suspected of being a runaway servant, and in danger of being taken up on that suspicion.
[D6-C0027] II BEGINNINGS IN PHILADELPHIA AND FIRST VOYAGE TO ENGLAND The only printer then in New York was old William Bradford, formerly of Philadelphia, whose monument may still be seen in Trinity Churchyard. To Mr. William Bradford accordingly young Franklin applied for work; but there was little printing done in the town and Bradford had no need of another hand at the press. He told Franklin, however, that his son at Philadelphia had lately lost his principal assistant by death, and advised Franklin to go thither. Without delay Franklin set out for that place, and after a somewhat adventurous journey arrived at the Market Street wharf about eight or nine o'clock of a Sunday morning.

---

#10: During another boat journey, a squall struck his vessel, pitching a passenger overboard whom Franklin saved by catching him by the hair.
Cited snippets:
[D4-C0076] "He may employ you, as he has recently lost an apprentice by death." Leaving his chest of clothes to go round by sea to Philadelphia, Benjamin took passage in a small dilapidated shore boat which crept along the coast to Amboy. A drunken Dutchman was his only fellow passenger. The gloom of the primeval forest overshadowed Governor's Island: not a single cabin as yet had been reared in its solitudes. A squall struck the boat, split its sail, and pitched the Dutchman overboard. Franklin caught him by the hair and saved him from drowning. The sudden tempest increased into a storm, and the boat was driven fiercely before the gale. The surf dashed so violently upon the shore that they could not venture to land. Night approached. Exhausted, drenched and hungry, they cast anchor near the Long Island shore, where a bend in the land afforded them slight protection while still they were in great danger. There were one or two log cabins in the vicinity. Several of the men came to the shore, but could afford them no relief. They had no provision on board excepting a single bottle of bad rum. All night long the tempest beat upon them. In the morning the wind had so far lulled that they were enabled to repair their sail, and to work their way on to Amboy.

---

#11: On September 1, 1730, Franklin married Deborah Read, who made him a good wife.
Cited snippets:
[D6-C0065] With prosperity Franklin began to think of matrimony. A family of Godfreys lived in the same house with him, and now Mrs. Godfrey undertook to make a match between him and the daughter of a relative of hers. Franklin's account of this affair for its coolness and placidity may almost be compared with Gibbon's "I sighed as a lover, I obeyed as a son." On learning that the girl's parents could not or would not give with her enough money to pay off his debts, the gallant suitor at once and irrevocably withdrew. He then looked about him for another match, but found to his chagrin that an adventurous printer could not command an agreeable wife and a dowry at the same time. Being determined to marry, that he might bring order into his life, he at last turned to Miss Read, with whom he had maintained a friendly correspondence, and notwithstanding the difficulties in the way married her on the 1st of September, 1730.
[D6-C0067] This was the first appearance of plate and china in our house, which afterward, in a course of years as our wealth increased, augmented gradually to several hundred pounds in value." Mrs. Franklin's temper was not of the serenest, and her manners perhaps were not such as would have honored him had she followed him into the great world; but she made him a good wife,--and we need not repeat the tattle which we are told is still current among some of the high families of Philadelphia. They had two children,--a son, the idol of his father's heart, who died as a child; and a daughter, who married Richard Bache, and is the ancestress of a large family.

---

#12: They had children together, including a son who died as a child and a daughter named Sarah, and Franklin also brought home his illegitimate son William.
Cited snippets:
[D6-C0067] This was the first appearance of plate and china in our house, which afterward, in a course of years as our wealth increased, augmented gradually to several hundred pounds in value." Mrs. Franklin's temper was not of the serenest, and her manners perhaps were not such as would have honored him had she followed him into the great world; but she made him a good wife,--and we need not repeat the tattle which we are told is still current among some of the high families of Philadelphia. They had two children,--a son, the idol of his father's heart, who died as a child; and a daughter, who married Richard Bache, and is the ancestress of a large family.
[D2-C0244] [Illustration: MRS. SARAH BACHE] The other child was a daughter, Sarah, also very handsome, who married Richard Bache and has left numerous descendants. His illegitimate son, William, was brought home when he was a year old and cared for along with his other children; and William’s illegitimate son, Temple Franklin, was the companion and secretary of his grandfather in England and France. The illegitimate daughter was apparently never brought home, and is not referred to in his writings, except in those occasional letters in which he sends her his love. According to the letter already mentioned as in the collection of the Pennsylvania Historical Society, she was married to John Foxcroft, who was deputy colonial postmaster in Philadelphia. It was well that she was kept away from Franklin’s house, for the presence of William appears to have given trouble enough. A household composed of legitimate and illegitimate children is apt to be inharmonious at times, especially when the mother of the legitimate children is the mistress of the house.

---

#13: Franklin engaged in extensive scientific pursuits and is best known for his discovery of the nature of lightning through his kite experiment.
Cited snippets:
[D3-C0855] Franklin was forty-two years old at this time; and it is a singular fact that his career as a philosopher did not begin really until he had passed his fortieth birthday. But from the time he was released from the care of the printing office, his advancement in science was rapid. His fame spread abroad, both in this country and Europe, so that, in a few years, he became one of the most renowned philosophers in the world. In a former chapter we described his experiment with a kite, to prove that lightning and the electric fluid are identical; and this discovery established his fame as the greatest electrician of the world. The Royal Society of London elected him a member by a unanimous vote, and the next year bestowed upon him the Copley medal. Yale College conferred upon him the degree of Master of Arts; and Harvard University did the same. Suddenly Franklin found himself the most conspicuous character in American history--a philosopher of the most honored type.

---

#14: He discovered and described positive and negative electricity, invented an open stove in 1742 for better warming rooms while saving fuel, and announced the invention of the lightning-rod.
Cited snippets:
[D2-C0363] Franklin was by no means alone in his studies. Besides the crowds who were interested from mere curiosity, there were three men--Ebenezer Kinnersley, Thomas Hopkinson, and Philip Syng--who experimented with him, and it was no mere amateurish work in which these men were engaged. Franklin was their spokesman and reported the results of his and their labor by means of letters to Mr. Peter Collinson. Within six months Hopkinson had observed the power of points to throw off electricity, or electrical fire, as he called it, and Franklin had discovered and described what is now known as positive and negative electricity. Within the same time Syng had invented an electrical machine, consisting of a sphere revolved on an axis with a handle, which was better adapted for producing the electrical spark than the tube-rubbing practised in Europe.
[D2-C0364] The experiments and the letters to Collinson describing them continued, and about this time we find Franklin writing a long and apparently the first intelligent explanation of the action of the Leyden jar. Then followed attempts to explain thunder and lightning as phenomena of electricity, and on July 29, 1750, Franklin sent to Collinson a paper announcing the invention of the lightning-rod, together with an explanation of its action.
[D1-C0294] In order of time, I should have mentioned before, that having, in 1742, invented an open stove for the better warming of rooms, and at the same time saving fuel, as the fresh air admitted was warmed in entering, I made a present of the model to Mr. Robert Grace, one of my early friends, who, having an iron-furnace, found the casting of the plates for these stoves a profitable thing, as they were growing in demand. To promote that demand, I wrote and published a pamphlet, entitled "An Account of the new-invented Pennsylvania Fireplaces; wherein their Construction and Manner of Operation is particularly explained; their Advantages above every other Method of warming Rooms demonstrated; and all Objections that have been raised against the Use of them answered and obviated," etc. This pamphlet had a good effect. Gov'r. Thomas was so pleas'd with the construction of this stove, as described in it, that he offered to give me a patent for the sole vending of them for a term of years; but I declin'd it from a principle which has ever weighed with me on such occasions, viz., That, as we enjoy great advantages from the inventions of others, we should be glad of an opportunity to serve others by any invention of ours; and this we should do freely and generously.

---

#15: Known for his strong sense of humor, he often used jokes and witticisms to relieve tension and restore good humor in Congress.
Cited snippets:
[D4-C0495] [Footnote 25: "And here perhaps we have one of the reasons why Dr. Franklin, who was universally confessed to be the ablest pen in America, was not always asked to write the great documents of the Revolution. He would have put a joke into the Declaration of Independence, if it had fallen to him to write it. At this time he was a humorist of fifty years standing, and had become fixed in the habit of illustrating great truths by grotesque and familiar similes. His jokes, the circulating medium of Congress, were as helpful to the cause, as Jay's conscience or Adams' fire; they restored good humor, and relieved the tedium of delay, but were out of place in formal, exact and authoritative papers."--_Parton's Franklin_, Vol. 2. p. 85.] One of Franklin's jokes, in Congress, is very characteristic of the man. It was urged that the Episcopal clergy should be directed to refrain from praying for the king. Franklin quenched the injudicious movement with a witticism.
[D2-C0031] He seems to have been totally without either irritability or excitability. In this he was the reverse of Washington, who was subject to violent outbursts of anger, could swear “like an angel of God,” as one of his officers said, and had a fiery temper to control. Perhaps Franklin’s strong sense of humor saved him from oaths; there are no swearing stories recorded of him; instead of them we have innumerable jokes and witticisms. His anger when aroused was most deliberate, calculating, and judicious. His enemies and opponents he always ridiculed, often, however, with so little malice or sting that I have no doubt they were sometimes compelled to join in the laugh. He never attacked or abused.

---

#16: Benjamin Franklin passed away at eleven o'clock at night on April 17, 1790, after sinking into a lethargy following his final words.
Cited snippets:
[D4-C0639] "Jesus can make a dying bed Feel soft as downy pillows are." A few hours before his death, as some one urged him to change his position, that he might breathe easier he replied, "a dying man can do nothing easy." These were his last words. He then sank into a lethargy, from which he passed into that sleep which has no earthly waking. It was eleven o'clock at night, April 17, 1790. He had lived eighty-four years, three months and eleven days. But no candid and charitable reader can peruse this narrative, without the admission that Benjamin Franklin, notwithstanding his imperfections, was one of the wisest and best of all the fallen children of Adam. From his dying hour to the present day his memory has been justly cherished with reverence and affection, throughout the civilized world. And there is no fear that this verdict will ever be reversed. TRANSCRIBER'S NOTE:

---

#17: He is remembered as one of the wisest of men, and his memory has been cherished with reverence and affection throughout the civilized world.
Cited snippets:
[D4-C0639] "Jesus can make a dying bed Feel soft as downy pillows are." A few hours before his death, as some one urged him to change his position, that he might breathe easier he replied, "a dying man can do nothing easy." These were his last words. He then sank into a lethargy, from which he passed into that sleep which has no earthly waking. It was eleven o'clock at night, April 17, 1790. He had lived eighty-four years, three months and eleven days. But no candid and charitable reader can peruse this narrative, without the admission that Benjamin Franklin, notwithstanding his imperfections, was one of the wisest and best of all the fallen children of Adam. From his dying hour to the present day his memory has been justly cherished with reverence and affection, throughout the civilized world. And there is no fear that this verdict will ever be reversed. TRANSCRIBER'S NOTE:

Return JSON: one verdict per sentence number.
```

**Raw response:**

```json
{
  "verdicts": [
    {
      "k": 1,
      "verdict": "supported"
    },
    {
      "k": 2,
      "verdict": "supported"
    },
    {
      "k": 3,
      "verdict": "supported"
    },
    {
      "k": 4,
      "verdict": "supported"
    },
    {
      "k": 5,
      "verdict": "supported"
    },
    {
      "k": 6,
      "verdict": "supported"
    },
    {
      "k": 7,
      "verdict": "supported"
    },
    {
      "k": 8,
      "verdict": "supported"
    },
    {
      "k": 9,
      "verdict": "supported"
    },
    {
      "k": 10,
      "verdict": "supported"
    },
    {
      "k": 11,
      "verdict": "supported"
    },
    {
      "k": 12,
      "verdict": "supported"
    },
    {
      "k": 13,
      "verdict": "supported"
    },
    {
      "k": 14,
      "verdict": "supported"
    },
    {
      "k": 15,
      "verdict": "supported"
    },
    {
      "k": 16,
      "verdict": "supported"
    },
    {
      "k": 17,
      "verdict": "supported"
    }
  ]
}
```
</details>
