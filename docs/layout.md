- ProPage
  - 作为页面布局的第一层，高度为100%，自带网络提示，组件里不要使用该组件
  ```vue
    // 这是一个页面
    <ProPage>
      ...
    </ProPage>
  ```
  
- ProLayout
  - 可以作为页面布局第二层，也可以作为组件布局第一层，使用的是flex布局
   ```vue
    // 这是一个页面
    <ProPage>
      <ProLayout>
      ...
      </ProLayout>
    </ProPage>
  ```
  ```vue
    // 这是一个组件
     <ProLayout>
     ...
     </ProLayout>
  ```

- ProHeader
  - 作为头部放置到 ProLayout 下，需要是严格的父子组件关系
  ```vue
    // 这是一个组件
     <ProLayout>
        <ProHeader>
        ...
        </ProHeader>
     </ProLayout>
  ```

- ProContent
  - 作为头部放置到 ProLayout 下，需要是严格的父子组件关系
  ```vue
    // 这是一个组件
     <ProLayout>
        <ProContent>
        ...
        </ProContent>
     </ProLayout>
  ```

- ProFooter
  - 作为头部放置到 ProLayout 下，需要是严格的父子组件关系
  ```vue
    // 这是一个组件
     <ProLayout>
        <ProFooter>
        ...
        </ProFooter>
     </ProLayout>
  ```
  
- 完整示例, ProHeader、ProContent、ProFooter 从上而下的顺序不能颠倒，将 ProHeader 和 ProFooter 放到 ProContent 中会随着内容一起滚动，否则就是固定在头尾
  ```vue
    // 这是一个组件
     <ProLayout>
        // 当 ProLayout 高度超出时，这里的内容会固定
        <ProHeader>
        ...
        </ProHeader>
  
        // 当 ProLayout 高度超出时，只有这里的内容会滚动
        <ProContent>
        ...
        </ProContent>
  
        // 当 ProLayout 高度超出时，这里的内容会固定
        <ProFooter>
        ...
        </ProFooter>
     </ProLayout>
  ```
  ```vue
     // 这是一个组件
     <ProLayout>
        // 当 ProLayout 高度超出时，只有这里的内容会滚动
        <ProContent>
            // 这里的内容会随 content 滚动
            <ProHeader>
            ...
            </ProHeader>
  
            ...
  
            // 这里的内容会随 content 滚动
            <ProFooter>
            ...
            </ProFooter>
        </ProContent>
     </ProLayout>
  ```