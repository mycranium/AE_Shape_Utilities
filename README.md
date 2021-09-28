Here are three scripts I've written to automate some repetetive processes we've encountered. They all work on shape layers that contain multiple shapes.

They are:
AE_Shapes_Textlike - It's for animating equations or other lines of text that exist as vectors and not as editable text. Please read the instructions in the User_Guide folder.

AE_Shape_Sort - This automatically puts shape groups in a shape layer into the right stacking order for animating using textlike. Instructions included in the User_Guide folder.

AE_Shape_Auto-follow - this one allows you to keyframe a transform property of one shape in the stack and have other shapes in the layer follow with a user-specified delay. It's similar to textlike, but it allows you to specify any of the 5 transform properties. You can run it multiple times to act on multiple transforms.

(The fourth script, AE_Shape_Sequence_Animate_UI, is a work-in-progress. At current it merely generates a UI panel that doesn't actually do anything. If you want to try it, the launcher goes in the ScriptsUI folder, and the other one goes one level up in the Scripts folder).

To use:
In all cases, put the script files in your normal After Effects Scripts folder (not ScriptUI Panels). To run, run the ones that end with the word "launcher".

Demo project files:

These are located in the Demo_AE_Projects folder in the repository root.

These were created with an older version of After Effects. You might be prompted to convert them whe you open them.

For those that contain expressions, if you get errors you should set the Expression Engine to Legacy in File > Project Settings. These were all written prior to Adobe's updating of their Javascript dialect.

AE_Shape_Auto_Follow_demo_project.aep This is a demo After Effects project for you to test out the shape_expressions script.

AE_Shapes_Textlike_and_AE_Shape_Sort_demo_project.aep is set upt to try out the AE_Textlike and AE_Shape_Sort scripts.

There's also AE_Shape_Sequence_Animate_UI_demo_project.aep if you decide you want to poke around with that script, but it doesn't really do anything.