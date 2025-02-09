let tree =
  {
    val: 1,
    children: [
      {
        val: 2,
        children: [
          {
            val: 3
          }
        ]
      },
      {
        val: 4,
        children: [
          {
            val: 5
          },
          {
            val: 6,
            children: [
              {
                val: 7
              },
              {
                val: 8
              }
            ]
          },
          {
            val: 9
          }
        ]
      }
    ]
  }
  //主要级就是当前节点遍历完，然后再去遍历兄弟节点这样的顺序
  let deepTraversal1 = (node, nodeList = []) => {
    if (node !== null) {
      nodeList.push(node.val)
      if(node.children && node.children.length>0){
        let children = node.children
        for (let i = 0; i < children.length; i++) {
          deepTraversal1(children[i], nodeList)
        }
      }
    }
    return nodeList
}
/**
 * 广度
 */
function treeForeach(tree){
  if(tree && !Array.isArray(tree)) {
    tree = [tree];
  }
  let node,list = [...tree]
  while(node = list.shift()){
    console.log(node.val);
    node.children && list.push(...node.children)
  }
}
console.log(treeForeach(tree))