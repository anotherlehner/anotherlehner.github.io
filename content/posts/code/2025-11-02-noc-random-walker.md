---
title: Nature of Code - Random Walker
date: 2025-11-02
---

For a small second post on the Nature of Code Chapter 0 I wanted to talk about the random walker, which simply takes a random step forward in one of four directions: up, down, left, and right. To quote from the book itself, a random walk can be used to model many different processes in nature:

> This may seem like an unsophisticated algorithm, but you can use random walks to model all sorts of phenomena that occur in the real world, from the movements of molecules in a gas, to the foraging of an animal, to the behavior of a gambler spending a day at the casino. [[source](https://natureofcode.com/random/#random-walks)]

Here is a video of my solution working on the Tic-80 with Janet:

I'm starting to learn some new little tricks with Janet and I managed to reduce the size of what I originally had. I quite like the ability to mix paradigms as I learn as well! I've used Clojure a little and while I found it enjoyable I also found I needed to conform more to it's functional approach from the start. That's not a big deal but I did have some moments of frustration. With Janet I'm learning about some of the same functional ideas but I can also easily do things in a more mutable imperative way too. This seems to smooth the learning to a more play and refine approach that I think I find more fun and less frustrating. Anyway, enough gabbing, here's the code...

```lisp
# title:   Janet Random Walker
# author:  clockworkmartian
# desc:    from nature of code chapter 0
# site:    none
# license: MIT License
# version: 0.1
# script: janet
# strict:  true

(use tic80)

(var walker
 @{:x (/ 240 2)
   :y (/ 136 2)})

(defn random [min max]
 (def fmin (math/ceil min))
 (def fmax (math/floor max))
  (+ fmin
   (math/floor 
    (* 
     (math/random) 
     (+ (- fmax fmin) 1)))))

(defn walker-step []
 (+= (walker :x) (random -1 1))
 (+= (walker :y) (random -1 1)))

(defn walker-show []
 (pix (walker :x) (walker :y) 8))

(defn BOOT []
 (cls 13)
 (print "Random Walker (Janet)" 5 5))

(defn TIC []
 (walker-step)
 (walker-show))
```
