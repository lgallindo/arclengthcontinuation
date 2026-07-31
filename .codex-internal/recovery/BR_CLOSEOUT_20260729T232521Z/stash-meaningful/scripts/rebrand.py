import os

REPLACEMENTS = {
    "Continue": "Arclength-Continuation",
    "continue.dev": "arclength-continuation.dev",
    "continuedev": "arclength-continuation",
    '"continue.': '"arclength-continuation.',
    "'continue.": "'arclength-continuation.",
    '"continue"': '"arclength-continuation"',
    "continue_": "arclength_continuation_",
    "Apache-2.0": "GPL-3.0-or-later"
}

def rebrand(dir_path):
    for root, dirs, files in os.walk(dir_path):
        if '.git' in root or 'node_modules' in root or 'dist' in root or 'out' in root or 'build' in root:
            continue
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.json', '.md', '.html', '.css', '.yaml', '.yml')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    new_content = content
                    for old, new in REPLACEMENTS.items():
                        new_content = new_content.replace(old, new)
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    pass

if __name__ == '__main__':
    rebrand('/home/lugatj/code/foss/continue')
