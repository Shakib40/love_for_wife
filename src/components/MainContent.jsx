import React from 'react'

function MainContent() {
  return (
    <div>
      {/* Floating petals */}
      <div className="petal" style={{ left: '8%', animationDuration: '12s', animationDelay: '0s' }}>🌸</div>
      <div className="petal" style={{ left: '22%', animationDuration: '15s', animationDelay: '3s' }}>✨</div>
      <div className="petal" style={{ left: '48%', animationDuration: '10s', animationDelay: '7s' }}>🌸</div>
      <div className="petal" style={{ left: '72%', animationDuration: '14s', animationDelay: '2s' }}>✨</div>
      <div className="petal" style={{ left: '90%', animationDuration: '11s', animationDelay: '5s' }}>🌸</div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div className="divider"></div>
        <h1 className="hero-title">To My Beloved Wife</h1>
        <p className="hero-sub">A message from my heart, in the way Allah ﷻ has blessed</p>
        <div className="divider" style={{ marginTop: '24px' }}></div>
        <p className="scroll-hint">↓ &nbsp; scroll &nbsp; ↓</p>
      </section>

      {/* QURAN VERSE */}
      <section>
        <div className="section-wrap fade-in">
          <div className="moon-section">
            {/* crescent moon SVG */}
            <svg className="moon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M55,10 A40,40,0,1,0,55,90 A28,28,0,1,1,55,10 Z" fill="#c9a84c"/>
              <circle cx="75" cy="22" r="4" fill="#e8cc7a" opacity="0.6"/>
              <circle cx="85" cy="38" r="2.5" fill="#e8cc7a" opacity="0.4"/>
            </svg>
          </div>

          <div className="section-title">The Quran on Marriage</div>
          <div className="ornament">❧ ✦ ❧</div>

          <div className="quran-card">
            <div className="arabic-quote">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </div>
            <p className="translation">
              "And among His signs is that He created for you from yourselves mates
              that you may find tranquility in them; and He placed between you
              <strong>affection and mercy</strong>."
            </p>
            <span className="ref-tag">Surah Ar-Rum • 30:21</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              هُنَّ لِبَاسٍ لَّكُمْ وَأَنتُمْ لِبَاسٍ لَّهُنَّ
            </div>
            <p className="translation">
              "They are a garment for you and you are a garment for them."
            </p>
            <span className="ref-tag">Surah Al-Baqarah • 2:187</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ ۚ فَإِنْ كَرِهْتُمُوهُنَّ فَعَسَىٰ أَنْ تَكْرَهُوا شَيْئًا وَيَجْعَلَ اللَّهُ فِيهِ خَيْرًا كَثِيرًا
            </div>
            <p className="translation">
              "Live with them in kindness. For if you dislike them — perhaps you dislike a thing and Allah places therein much good."
            </p>
            <span className="ref-tag">Surah An-Nisa • 4:19</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ
            </div>
            <p className="translation">
              "And women have rights similar to those over them in kindness."
            </p>
            <span className="ref-tag">Surah Al-Baqarah • 2:228</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              إِنَّ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ … أَعَدَّ اللَّهُ لَهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا
            </div>
            <p className="translation">
              "Indeed, the Muslim men and Muslim women … Allah has prepared for them forgiveness and a great reward."
            </p>
            <span className="ref-tag">Surah Al-Ahzab • 33:35</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              وَأَنكِحُوا الْأَيَامَى مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِنْ يَكُونُوا فُقَرَاءَ فَيُغْنِيهِمُ اللَّهُ مِنْ فَضْلِهِ
            </div>
            <p className="translation">
              "Marry the unmarried among you … If they are poor, Allah will enrich them from His bounty."
            </p>
            <span className="ref-tag">Surah An-Nur • 24:32</span>
          </div>

          <div className="quran-card">
            <div className="arabic-quote">
              هُوَ الَّذِي خَلَقَكُم مِّنْ نَّفْسٍ وَاحِدَةٍ وَجَعَلَ مِنْهَا زَوْجَهَا لِيَسْكُنَ إِلَيْهَا
            </div>
            <p className="translation">
              "It is He who created you from one soul and created from it its mate that he might find comfort with her."
            </p>
            <span className="ref-tag">Surah Al-A'raf • 7:189</span>
          </div>
        </div>
      </section>

      {/* LOVE LETTER */}
      <section>
        <div className="section-wrap fade-in">
          <div className="section-title">A Message From My Heart</div>
          <div className="divider"></div>

          <div className="letter-box">
            <p>السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>

            <p>
              My dear wife, I thank Allah ﷻ every day for blessing me with you.
              You are not just my partner in this life — you are my companion in
              this journey toward Jannah, the one who completes half of my deen.
            </p>

            <p>
              The Prophet ﷺ said: <em>"The world is a provision, and the best provision
              of the world is a righteous woman."</em> You are my greatest provision
              from Allah ﷻ, and I do not take that gift lightly.
            </p>

            <p>
              Every smile you carry, every sabr you show, every dua you make for
              our home — I see it all. I am grateful for you in a way that words
              cannot fully contain.
            </p>

            <p>
              May Allah ﷻ bless our home with His mercy, fill it with love and
              laughter, and unite us — and our children — in the highest ranks of
              Jannah. Ameen.
            </p>

            <p className="closing">— Your husband, always in your corner 🤍</p>
          </div>
        </div>
      </section>

      {/* HADITHS */}
      <section>
        <div className="section-wrap fade-in">
          <div className="section-title">What the Prophet ﷺ Taught Us</div>
          <div className="section-arabic">قَالَ رَسُولُ اللَّهِ ﷺ</div>
          <div className="section-ref">Hadith on Love & Marriage</div>

          <div className="hadith-grid">
            <div className="hadith-card">
              <span className="hadith-icon">🌹</span>
              <p className="hadith-text">
                "The best of you are those who are best to their wives, and I am the best of you to my wives."
              </p>
              <div className="hadith-source">Tirmidhi • Sahih</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🕊️</span>
              <p className="hadith-text">
                "When a husband and wife look at each other with love, Allah looks at both of them with mercy."
              </p>
              <div className="hadith-source">Mishkat Al-Masabih</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🤲</span>
              <p className="hadith-text">
                "A man who spends on his family seeking reward from Allah — that spending is an act of charity for him."
              </p>
              <div className="hadith-source">Bukhari & Muslim</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">💎</span>
              <p className="hadith-text">
                "The world is a provision, and the best provision of the world is a pious and righteous woman."
              </p>
              <div className="hadith-source">Sahih Muslim</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🌙</span>
              <p className="hadith-text">
                "Among the believers who show the most perfect faith are those with the best character, and the best of you are those who are best to their wives."
              </p>
              <div className="hadith-source">Tirmidhi • Hasan Sahih</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🤍</span>
              <p className="hadith-text">
                "No believing man should hate a believing woman. If he dislikes one of her traits, he will be pleased with another."
              </p>
              <div className="hadith-source">Sahih Muslim</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🌿</span>
              <p className="hadith-text">
                "Fear Allah regarding women, for you have taken them as a trust from Allah, and their intimacy has been made lawful to you by the word of Allah."
              </p>
              <div className="hadith-source">Sahih Muslim • Farewell Sermon</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">☀️</span>
              <p className="hadith-text">
                "A dinar spent in the way of Allah, on freeing a slave, on charity — none is greater in reward than a dinar spent on your family."
              </p>
              <div className="hadith-source">Sahih Muslim</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">⭐</span>
              <p className="hadith-text">
                "If a woman prays her five prayers, fasts her month, guards her chastity, and obeys her husband, she will enter Jannah from whichever gate she wishes."
              </p>
              <div className="hadith-source">Ibn Hibban • Sahih</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">💛</span>
              <p className="hadith-text">
                "If you love someone, tell them — for it strengthens the bond between you."
              </p>
              <div className="hadith-source">Abu Dawud • Sahih</div>
            </div>
            <div className="hadith-card">
              <span className="hadith-icon">🌸</span>
              <p className="hadith-text">
                "Verily, Allah is gentle and loves gentleness in all matters."
              </p>
              <div className="hadith-source">Bukhari & Muslim</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA HADITH — On Mercy & Home */}
      <section>
        <div className="section-wrap fade-in">
          <div className="section-title">On Mercy, Kindness & the Home</div>
          <div className="section-arabic">الرَّحْمَةُ فِي الْبُيُوتِ</div>
          <div className="section-ref">Building a home filled with the mercy of Allah ﷻ</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🤲</div>
              <div>
                <p className="hadith-row-text">"The merciful are shown mercy by the Most Merciful. Show mercy to those on earth, and the One in the heavens will show mercy to you."</p>
                <span className="hadith-source">Tirmidhi • Sahih</span>
              </div>
            </div>

            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🏡</div>
              <div>
                <p className="hadith-row-text">"The house in which greetings of peace are exchanged is blessed, and the angels love such a house."</p>
                <span className="hadith-source">Al-Adab Al-Mufrad</span>
              </div>
            </div>

            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🌺</div>
              <div>
                <p className="hadith-row-text">"The most complete of the believers in faith is the one with the best character, and the best of you in character are those who are best to their women."</p>
                <span className="hadith-source">Tirmidhi • Hasan</span>
              </div>
            </div>

            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🌟</div>
              <div>
                <p className="hadith-row-text">"Nothing is heavier on the scales of a believer on the Day of Resurrection than good character. Allah detests the one who is immoral and foul-mouthed."</p>
                <span className="hadith-source">Tirmidhi • Sahih</span>
              </div>
            </div>

            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🕊️</div>
              <div>
                <p className="hadith-row-text">"Make things easy and do not make them difficult; give glad tidings and do not repel people."</p>
                <span className="hadith-source">Bukhari & Muslim</span>
              </div>
            </div>

            <div className="hadith-row-card">
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🌹</div>
              <div>
                <p className="hadith-row-text">"The Prophet ﷺ used to help with household chores and would mend his own sandals, sew his own garment, and serve himself." — He led by example at home.</p>
                <span className="hadith-source">Ahmad • Sahih</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUA */}
      <section>
        <div className="section-wrap fade-in">
          <div className="dua-box">
            <div className="section-title" style={{ marginBottom: '28px' }}>A Dua For Us</div>
            <div className="dua-arabic">
              رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
            </div>
            <p className="dua-translation">
              "Our Lord, grant us from among our spouses and offspring comfort to
              our eyes and make us a leader for the righteous."
            </p>
            <p style={{ color: '#c9a84c', marginTop: '16px', fontSize: '0.8rem', letterSpacing: '0.2em' }}>SURAH AL-FURQAN • 25:74</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer fade-in">
        <div className="footer-heart">❤️</div>
        <p className="footer-msg">
          May Allah bless you, protect you, and make you the light of our home always.
        </p>
        <p className="footer-name">Written with love, in the way of Allah ﷻ</p>
        <div className="divider" style={{ marginTop: '28px' }}></div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(184,160,122,0.5)', marginTop: '16px', letterSpacing: '0.2em' }}>
          اللهم بارك في أزواجنا وبيوتنا • آمين
        </p>
      </footer>
    </div>
  )
}

export default MainContent
