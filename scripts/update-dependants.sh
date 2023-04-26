DIRS=("../Fin/Backend" "../Fin/Client")

for i in "${DIRS[@]}"
do
  if [ -d "$i" ]
  then
    (cd $i && npm run update lullo-utils --force)
  else
    echo ""
    echo -e "[\e[33mWARN\e[0m] Tried to auto update \e[33;1m\`lullo-utils\`\e[0m in \e[35m$i\e[0m but could not find directory"
  fi
done