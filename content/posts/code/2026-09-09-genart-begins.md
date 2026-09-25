---
title: Genart Begins
date: 2026-09-09
---

With the move to Canada mostly complete (I hung curtains and my mattress has shipped so I hopefully can start sleeping a little better soon, the pod is still MIA) I have started looking toward other activities. With my job at CMU wound down I'm focusing on three main objectives for the next four months:

1. Working out daily and getting a good healthy eating routine re-established
2. Painting/drawing every day (still working on getting this one going)
3. Generative computer art

This blog post is going to focus on #3. I've been mulling over in my head for a couple months what projects I wanted to do during my break in Canada before getting back into work. What I landed on was reading and doing the exercises through the book *Nature of Code*, by Daniel Shiffman. 

When I read a technical book like this I typically do the exercises in another language if I can so that I'm not so much a passive reader. I know typing in code from exercises and playing with them isn't exactly "passive" but unfortunately I think my engagement goes down a little when I'm mostly re-typing in things instead of having to think through them. Toward that goal I wanted to work through the book using another stack than Javascript.

I looked at a whole bunch of different languages and the whole preparation stage for this turned into more analysis paralysis than anything else but I think I learned some useful things about myself and my goal. Since I want to get through some of this book before the next century I ultimately decided to use something that compiles to Javascript. Going through some options like ReScript, ClojureScript, OCaml, F#, PureScript, Scheme, Gleam, Kotlin, Scala, and Standard ML was an adventure in itself! I'm down to two possibilities: ClojureScript and PureScript. I might revisit Scheme at some point as well.

Here's some of my thoughts on each option, which obviously skewed pretty hard into functional languages:

* **ReScript:** I didn't like that ReScript was so similar to Javascript but I really liked how easy it was to get going, the overall environment and build process was great.
* **OCaml:** OCaml took a bit more to get running than ReScript, I liked the syntax much more, but the Javascript interop, at least with `js_of_ocaml`, felt heavier and more fussy than what I wanted to deal with.
* **F#:** F# I unfairly excluded because I don't much want to learn .NET right now.
* **Gleam:** Gleam was reasonably nice to set up, the error messages were great, but I guess I didn't like the braces, it made it feel too much like day-to-day work, which I wanted to get away from -- also I have this unreasonably silly notion that a language shouldn't allow division by 0 to be 0, I realize that's unfair of me, the rest of the experience was pretty good.
* **Scheme:** Scheme was an interesting animal; I used Racketscript for some experiments, BiwaScheme, and Gambit Scheme. For the life of me I couldn't get Gambit to build javascript files, I think this was an installation problem on my part. Biwa was very interesting and if I had more time I'd explore that more. Racketscript mostly also worked -- the reason I didn't go further down this route was mostly time and interactivity, If I choose a lispish language like ClojureScript then I get some great interactive development out of the box with `shadow-cljs`.
* **Kotlin:** Kotlin was a bit too much like day-to-day, too close to home (Java).
* **Scala:** Scala builds were too slow for me.
* **Standard ML:** Standard ML was tantalizingly close to what I've always wanted in a language, I had never used it before now. Using `lunarml`, which compiles to both Lua and Javascript, I created a canvas-based experiment I really liked and felt very clean. I also created a simple `raylib 6` experiment using the C FFI of `mlton`. Worked pretty well, I'm going to revisit this in the future at some point. It's a pity that SML has a few quirks that might make it difficult for day-to-day use (eg record update syntax) and the community is fairly small.

So I'm left with `cljs` and `purs`. I really like the idea of learning some deeper functional programming approaches with `purs` and I generally like static typing more than dynamic so I lean that way with my own bias. `cljs` I've done some game experiments with using `rotjs` and that was a pretty good experience. I think it just comes down to which is ringing more bells than the other so I'm going to get started with the book with both side-by-side and see which feels like it's pulling me harder.

For a little teaser here's my first image generated with PureScript in ppm format...

![demo png](../../assets/test.png)
