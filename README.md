# Music harmony generator
Project consist from 4 parts (I plan to separate them in own repositories in the future):
## Note entity
###### Stable. Production ready.
Note entity is a library which allows you to manage music notes like any other JS type. (I did the same for colors in Colorhole). But note entity provides a lot of specific operations. You can manage  
1. Check input value and reset self. It's secure and you shouldn't worry about values you pass.
2. Can handle tones and halftones in different octaves
3. Can build harmony: Melodic minor, harmonic major/minor, natural minor/major
4. Harmony can depends on pentatonic
5. Check is string a note
6. Transponate octave
7. **Export note to the midi note**
8. Export harmony to array of notes
9. Export harmony to string

I will provide API reference soon

## Pianoboard
###### Raw. Hardly depends on markup and deep chained with example.
Pianoboard allows you to:
1. Draw a piano. Adds id's with note name and keys labels
2. Press button on keyboard by note notation
2. Highlight buttons using notes array (harmony line)
3. Highlight active button

I will provide API reference but not soon.

## Midi-Compiler
###### Deep raw experiment
Attempt to handle a bunch of libraries in a browser to provide possibility to play midi. Works with soundfonts so you can play midi in any operation system. Now it's just a little handler to provide possibility to play notes in a browser, but I plan to extend and improve it.

Don't have any API for a moment and hardly depends on other applications parts

## Noteselector
It's an application which is a glue for all the components. Provides possibility to manage harmonies and represent them on piano keyboard.d.