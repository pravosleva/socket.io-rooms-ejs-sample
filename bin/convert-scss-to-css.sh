
#!/bin/sh

# V1

dist_dir='./public/css'

./node_modules/.bin/node-sass scss -o "${dist_dir}/${path}" || exit 1

# V2

# dist_dir='./server-dist'
#
# for path in \
#     scss
# do
#     arg='--out-file'
#
#     if [ -d "./${path}" ]; then
#         arg='-d'
#     fi
#
#     ./node_modules/.bin/node-sass sass/index.scss --source-map-root file://${PWD}/ --source-map-embed true || exit 1
# done
